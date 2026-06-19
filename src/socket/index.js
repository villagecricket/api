const scoringHandler = require('./handlers/scoring.handler');
const broadcastHandler = require('./handlers/broadcast.handler');
const auctionStateService = require('../services/auction-state.service');
const auctionService = require('../services/auction.service');
const { AuctionSession, AuctionPlayer, AuctionTeam, AuctionBid, AuctionLog, PlayerMaster, TeamMaster, User, Owner } = require('../models');
const jwt = require('../utils/jwt');

module.exports = function initializeSockets(io) {

    /* ========================================================
       AUCTION NAMESPACE  (/auction)
       All auction events — Admin and Teams both connect here.
       Roles are determined by the JWT token passed on connect.
     ======================================================== */
    const auctionNamespace = io.of('/auction');

    auctionNamespace.use((socket, next) => {
        const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.split(' ')[1];
        if (!token) return next(new Error('Authentication token missing'));
        try {
            const decoded = jwt.verifyAccessToken(token);
            socket.data.userId = decoded.userId;
            socket.data.userRole = decoded.role;
            next();
        } catch (err) {
            next(new Error('Invalid authentication token'));
        }
    });

    auctionNamespace.on('connection', async (socket) => {
        console.log(`🎯 Auction socket connected: ${socket.id} (user: ${socket.data.userId}, role: ${socket.data.userRole})`);

        /* ── Join session room ── */
        socket.on('join-session', async ({ sessionId }) => {
            try {
                const state = await auctionStateService.getSessionState(sessionId);
                state.namespace = auctionNamespace;

                socket.join(`session-${sessionId}`);
                socket.data.sessionId = sessionId;

                // Send full current state to the joining client
                socket.emit('session-state', {
                    session: {
                        sessionId: state.sessionId,
                        name: state.session.Name,
                        maxBudget: state.session.MaxBudget,
                        maxPlayersPerTeam: state.session.MaxPlayersPerTeam,
                        status: state.session.Status,
                    },
                    players: state.players,
                    teams: state.teams,
                    currentPlayer: state.players[state.currentPlayerIndex] || null,
                    currentPlayerIndex: state.currentPlayerIndex,
                    secondsLeft: state.secondsLeft,
                });

                console.log(`✅ Client ${socket.id} joined session ${sessionId}`);
            } catch (err) {
                socket.emit('error', { message: err.message });
            }
        });

        /* ── ADMIN: Start the current player for bidding ── */
        socket.on('start-player', async () => {
            const { sessionId } = socket.data;
            if (!sessionId) return socket.emit('error', { message: 'Not in a session' });

            try {
                const state = await auctionStateService.getSessionState(sessionId);
                const result = await auctionStateService.startPlayer(state);

                if (!result.success) {
                    return socket.emit('error', { message: result.reason });
                }

                auctionNamespace.to(`session-${sessionId}`).emit('player-started', {
                    player: result.player,
                    secondsLeft: state.secondsLeft,
                });

                console.log(`▶️  Session ${sessionId}: Player "${result.player.name}" started`);
            } catch (err) {
                socket.emit('error', { message: err.message });
            }
        });

        /* ── ADMIN: Skip the current player ── */
        socket.on('skip-player', async () => {
            const { sessionId } = socket.data;
            if (!sessionId) return socket.emit('error', { message: 'Not in a session' });

            try {
                const state = await auctionStateService.getSessionState(sessionId);
                const result = await auctionStateService.skipPlayer(state);

                if (!result.success) {
                    return socket.emit('error', { message: result.reason });
                }

                const nextPlayer = state.players[state.currentPlayerIndex] || null;
                auctionNamespace.to(`session-${sessionId}`).emit('player-skipped', {
                    skippedPlayerId: state.players[state.currentPlayerIndex - 1]?.playerId,
                    nextPlayer,
                });

                console.log(`⏭️  Session ${sessionId}: Player skipped`);
            } catch (err) {
                socket.emit('error', { message: err.message });
            }
        });

        /* ── ADMIN: Sell the current player ── */
        socket.on('sell-player', async ({ teamId, finalBid }) => {
            const { sessionId } = socket.data;
            if (!sessionId) return socket.emit('error', { message: 'Not in a session' });

            try {
                const state = await auctionStateService.getSessionState(sessionId);
                const result = await auctionStateService.sellPlayer(state, teamId, finalBid);

                if (!result.success) {
                    return socket.emit('error', { message: result.reason });
                }

                const nextPlayer = state.players[state.currentPlayerIndex] || null;
                auctionNamespace.to(`session-${sessionId}`).emit('player-sold', {
                    player: result.player,
                    teamId,
                    soldPrice: finalBid,
                    teams: result.teams,
                    nextPlayer,
                });

                console.log(`🔨 Session ${sessionId}: Player "${result.player.name}" sold for ₹${finalBid}`);
            } catch (err) {
                socket.emit('error', { message: err.message });
            }
        });

        /* ── ADMIN: Mark current player unsold ── */
        socket.on('mark-unsold', async () => {
            const { sessionId } = socket.data;
            if (!sessionId) return socket.emit('error', { message: 'Not in a session' });

            try {
                const state = await auctionStateService.getSessionState(sessionId);
                const result = await auctionStateService.markUnsold(state);

                if (!result.success) {
                    return socket.emit('error', { message: result.reason });
                }

                const nextPlayer = state.players[state.currentPlayerIndex] || null;
                auctionNamespace.to(`session-${sessionId}`).emit('player-unsold', {
                    player: state.players[state.currentPlayerIndex - 1],
                    nextPlayer,
                });

                console.log(`❌ Session ${sessionId}: Player marked unsold`);
            } catch (err) {
                socket.emit('error', { message: err.message });
            }
        });

/* ── OWNER/TEAM: Place a bid ── */
         socket.on('place-bid', async ({ teamId, playerId, bidAmount }) => {
             const { sessionId } = socket.data;
             if (!sessionId) return socket.emit('bid-rejected', { reason: 'Not in a session' });
             // Security: verify teamId belongs to this owner
             const { Owner } = require('../models');
             const owner = await Owner.findOne({ where: { UserID: socket.data.userId } });
             if (owner && owner.TeamID !== teamId) {
                 return socket.emit('bid-rejected', { reason: 'You can only bid with your own team' });
             }

            try {
                const state = await auctionStateService.getSessionState(sessionId);
                const result = await auctionStateService.placeBid(state, teamId, playerId, bidAmount);

                if (!result.success) {
                    return socket.emit('bid-rejected', { reason: result.reason });
                }

                const player = state.players[state.currentPlayerIndex];
                const team = state.teams.find(t => t.teamId === teamId);

                // Confirm to bidder
                socket.emit('bid-accepted', { bidAmount, playerId });

                // Broadcast to everyone in the room
                auctionNamespace.to(`session-${sessionId}`).emit('bid-placed', {
                    playerId,
                    teamId,
                    teamName: team?.name,
                    bidAmount,
                    currentBid: player.currentBid,
                    secondsLeft: state.secondsLeft,
                    timestamp: new Date(),
                });

                console.log(`💰 Session ${sessionId}: Team ${team?.name} bid ₹${bidAmount} on player ${player.name}`);
            } catch (err) {
                socket.emit('bid-rejected', { reason: err.message });
            }
        });

        /* ── Get latest session state (reconnect/refresh) ── */
        socket.on('get-state', async () => {
            const { sessionId } = socket.data;
            if (!sessionId) return socket.emit('error', { message: 'Not in a session' });

            try {
                const state = await auctionStateService.getSessionState(sessionId);
                socket.emit('session-state', {
                    session: {
                        sessionId: state.sessionId,
                        name: state.session.Name,
                        maxBudget: state.session.MaxBudget,
                        maxPlayersPerTeam: state.session.MaxPlayersPerTeam,
                        status: state.session.Status,
                    },
                    players: state.players,
                    teams: state.teams,
                    currentPlayer: state.players[state.currentPlayerIndex] || null,
                    currentPlayerIndex: state.currentPlayerIndex,
                    secondsLeft: state.secondsLeft,
                });
            } catch (err) {
                socket.emit('error', { message: err.message });
            }
        });

        /* ── OWNER: Register team for auction (if not already registered) ── */
        socket.on('register-team', async ({ teamId }) => {
            const { sessionId } = socket.data;
            if (!sessionId) return socket.emit('error', { message: 'Not in a session' });

            // Security: owner can only register their own team
            if (socket.data.userRole === 'owner') {
                const owner = await Owner.findOne({ where: { UserID: socket.data.userId } });
                if (owner && owner.TeamID !== teamId) {
                    return socket.emit('team-registered', { success: false, message: 'You can only register your own team' });
                }
            }

            try {
                const result = await auctionService.registerTeam(sessionId, teamId);

                // Reload session state from DB to include new team by clearing cache
                auctionStateService.clearSessionState(sessionId);
                const state = await auctionStateService.getSessionState(sessionId);
                state.namespace = auctionNamespace;

                // Broadcast updated state to all clients in the session
                auctionNamespace.to(`session-${sessionId}`).emit('session-state', {
                    session: {
                        sessionId: state.sessionId,
                        name: state.session.Name,
                        maxBudget: state.session.MaxBudget,
                        maxPlayersPerTeam: state.session.MaxPlayersPerTeam,
                        status: state.session.Status,
                    },
                    players: state.players,
                    teams: state.teams,
                    currentPlayer: state.players[state.currentPlayerIndex] || null,
                    currentPlayerIndex: state.currentPlayerIndex,
                    secondsLeft: state.secondsLeft,
                });

                socket.emit('team-registered', { success: true, data: result.data });
                console.log(`✅ Team ${teamId} registered in session ${sessionId}`);
            } catch (err) {
                socket.emit('team-registered', { success: false, message: err.message });
            }
        });

        /* ── Disconnect ── */
        socket.on('disconnect', () => {
            console.log(`🔌 Auction socket disconnected: ${socket.id}`);
        });
    });

    /* ========================================================
       LIVE SCORING NAMESPACE (existing, untouched)
    ======================================================== */
    scoringHandler(io);

    /* ========================================================
       BROADCAST/CAMERA NAMESPACE (existing, untouched)
    ======================================================== */
    broadcastHandler(io);

    console.log('✅ All Socket.IO handlers initialized');
};
