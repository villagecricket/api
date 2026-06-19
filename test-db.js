const { User, Owner, PlayerMaster, Member } = require('./src/models');
async function test() {
  const users = await User.findAll({ limit: 10, order: [['CreatedAt', 'DESC']] });
  console.log("Latest Users:", users.map(u => ({ id: u.UserID, email: u.Email, role: u.Role })));
  
  const owners = await Owner.findAll({ limit: 10, order: [['CreatedAt', 'DESC']] });
  console.log("Latest Owners:", owners.map(o => ({ id: o.OwnerID, userId: o.UserID, contact: o.ContactNumber, status: o.VerificationStatus })));
}
test().catch(console.error).finally(() => process.exit(0));
