'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    return queryInterface.bulkInsert('Users', [{
      Email: 'admin@kkkcricket.com',
      PasswordHash: hashedPassword,
      Role: 'super_admin',
      CreatedAt: new Date(),
      UpdatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', { Email: 'admin@kkkcricket.com' }, {});
  }
};