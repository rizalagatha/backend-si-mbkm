'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert data ke dalam tabel Mahasiswa
    await queryInterface.bulkInsert('mahasiswa', [
      {
        NIM: 21120120120001,
        nama_mahasiswa: 'Rizal Agatha Erdin Agesyah',
        semester: 9,
        id_program_mbkm: 1, // Sesuaikan dengan data yang ada di tabel program_mbkm
        NIP_dosbing: 123456, // Sesuaikan dengan data yang ada di tabel dosbing
      },
      {
        NIM: 21120120120002,
        nama_mahasiswa: 'John Doe',
        semester: 7,
        id_program_mbkm: 2,
        NIP_dosbing: 789012,
      },
      {
        NIM: 21120120120003,
        nama_mahasiswa: 'Jane Smith',
        semester: 5,
        id_program_mbkm: 3,
        NIP_dosbing: 345678,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Hapus data dari tabel Mahasiswa
    await queryInterface.bulkDelete('mahasiswa', null, {});
  }
};
