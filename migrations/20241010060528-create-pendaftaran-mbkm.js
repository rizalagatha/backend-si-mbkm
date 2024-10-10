'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pendaftaran_mbkm', {
      id_pendaftaran_mbkm: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      NIM: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'mahasiswa', // Refers to mahasiswa table
          key: 'NIM'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      NIP_dosbing: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'dosbing', // Refers to dosbing table
          key: 'NIP_dosbing'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      NIP_koor_mbkm: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'koor_mbkm', // Refers to koor_mbkm table
          key: 'NIP_koor_mbkm'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      tanggal: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pendaftaran_mbkm');
  }
};
