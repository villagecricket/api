require('dotenv').config();
const db = require('./src/models');
db.sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced successfully with alter: true');
    process.exit(0);
}).catch(err => {
    console.error('Error syncing database:', err);
    process.exit(1);
});
