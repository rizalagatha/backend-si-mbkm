'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('berkas_penilaian', {
      id_berkas_penilaian: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_pendaftaran_mbkm: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pendaftaran_mbkm',
          key: 'id_pendaftaran_mbkm'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      nama_berkas: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('berkas_penilaian');
  }
};
