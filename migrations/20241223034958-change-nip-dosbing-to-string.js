'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('dosbing', 'NIP_dosbing', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('dosbing', 'NIP_dosbing', {
      type: Sequelize.BIGINT,
      allowNull: false,
    });
  }
};
