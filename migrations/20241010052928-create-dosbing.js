'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dosbing', {
      NIP_dosbing: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      nama_dosbing: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('dosbing');
  }
};
