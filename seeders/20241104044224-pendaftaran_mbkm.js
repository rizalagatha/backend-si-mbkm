'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('pendaftaran_mbkm', [
      {
        id_pendaftaran_mbkm: 1,
        NIM: 21120120120001,        // Sesuaikan dengan NIM di tabel mahasiswa
        NIP_dosbing: 123456,  // Sesuaikan dengan NIP_dosbing di tabel dosbing
        NIP_koor_mbkm: 123456789, // Sesuaikan dengan NIP_koor_mbkm di tabel koor_mbkm
        tanggal: new Date('2023-10-01')
      },
      {
        id_pendaftaran_mbkm: 2,
        NIM: 21120120120002,        // Sesuaikan dengan NIM di tabel mahasiswa
        NIP_dosbing: 345678,  // Sesuaikan dengan NIP_dosbing di tabel dosbing
        NIP_koor_mbkm: 123456789, // Sesuaikan dengan NIP_koor_mbkm di tabel koor_mbkm
        tanggal: new Date('2023-11-01')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('pendaftaran_mbkm', null, {});
  }
};
