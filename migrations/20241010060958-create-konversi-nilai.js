'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('konversi_nilai', {
      id_konversi_nilai: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      NIP_admin_siap: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'admin_siap',
          key: 'NIP_admin_siap'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      nilai_akhir: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      grade: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('konversi_nilai');
  }
};
