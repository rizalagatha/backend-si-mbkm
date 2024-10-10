'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('konversi_nilai', 'id_berkas_penilaian', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'berkas_penilaian',
        key: 'id_berkas_penilaian'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('konversi_nilai', 'id_berkas_penilaian');
  }
};
