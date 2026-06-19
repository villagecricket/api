'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Sample teams
    await queryInterface.bulkInsert('TeamMasters', [
      { Name: 'KKR Warriors', LogoURL: null, Founded: '2020', Location: 'Kolkata', Coach: 'Karthik', OwnerName: 'KKR Owner', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'MI Champions', LogoURL: null, Founded: '2019', Location: 'Mumbai', Coach: 'Rohit', OwnerName: 'MI Owner', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'RCB Rising', LogoURL: null, Founded: '2021', Location: 'Bangalore', Coach: 'Faf', OwnerName: 'RCB Owner', CreatedAt: new Date(), UpdatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TeamMasters', { Name: ['KKR Warriors', 'MI Champions', 'RCB Rising'] });
  }
};