'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pengumuman', {
      id_pengumuman: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      judul: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isi: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      tanggal: {
        type: Sequelize.DATE,
        allowNull: false
      },
      NIP_koor_mbkm: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'koor_mbkm', // Nama tabel koor_mbkm di database
          key: 'NIP_koor_mbkm'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pengumuman');
  }
};
