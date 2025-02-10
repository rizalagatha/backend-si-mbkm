'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('matkul_knvrs', 'jenis_matkul', {
      type: Sequelize.ENUM('pilihan_ganjil', 'pilihan_genap', 'wajib'),
      allowNull: false,
      defaultValue: 'wajib' // Default value jika diperlukan
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Untuk rollback migrasi
    await queryInterface.removeColumn('matkul_knvrs', 'jenis_matkul');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_matkul_knvrs_jenis_matkul";');
  }
};
