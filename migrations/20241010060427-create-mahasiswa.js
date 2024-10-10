'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mahasiswa', {
      NIM: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false
      },
      nama_mahasiswa: {
        type: Sequelize.STRING,
        allowNull: false
      },
      semester: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      id_program_mbkm: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'program_mbkm', // Refers to table program_mbkm
          key: 'id_program_mbkm'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      NIP_dosbing: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'dosbing', // Refers to table dosbing
          key: 'NIP_dosbing'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('mahasiswa');
  }
};
