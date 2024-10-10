'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('koor_mbkm', {
      NIP_koor_mbkm: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false
      },
      nama_koor_mbkm: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('koor_mbkm');
  }
};
