'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('riwayat', {
      id_riwayat: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      NIM: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'mahasiswa', // Nama tabel mahasiswa
          key: 'NIM',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nilai: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nama_berkas: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_program_mbkm: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'program_mbkm', // Nama tabel program_mbkm
          key: 'id_program_mbkm',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('riwayat');
  },
};
