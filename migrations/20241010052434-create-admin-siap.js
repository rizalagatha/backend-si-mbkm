'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('admin_siap', {
      NIP_admin_siap: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false
      },
      nama_admin_siap: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('admin_siap');
  }
};
