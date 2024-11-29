'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('berkas_penilaian', 'jenis_berkas', {
      type: Sequelize.ENUM('CV', 'transkrip', 'KTP', 'sertifikat', 'dokumen_tambahan'),
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('berkas_penilaian', 'jenis_berkas');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_berkas_penilaian_jenis_berkas";'); // Hapus tipe ENUM
  },
};