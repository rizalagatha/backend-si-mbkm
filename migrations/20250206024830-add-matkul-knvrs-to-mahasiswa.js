'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('mahasiswa', 'id_matkul_knvrs', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'matkul_knvrs', // Pastikan nama tabel sesuai dengan DB
        key: 'id_matkul_knvrs',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('mahasiswa', 'id_matkul_knvrs');
  },
};
