'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pendaftaran_akun', {
      id_pendaftaran_akun: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      NIM: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'mahasiswa', // FK ke tabel mahasiswa
          key: 'NIM'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      NIP_koor_mbkm: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'koor_mbkm', // FK ke tabel koor_mbkm
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
    await queryInterface.dropTable('pendaftaran_akun');
  }
};
