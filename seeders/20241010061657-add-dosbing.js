'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert data ke dalam tabel Dosbing
    await queryInterface.bulkInsert('dosbing', [
      {
        NIP_dosbing: 123456,
        nama_dosbing: 'Dr. Asep Sutrisno'
      },
      {
        NIP_dosbing: 789012,
        nama_dosbing: 'Dr. Budi Santoso'
      },
      {
        NIP_dosbing: 345678,
        nama_dosbing: 'Dr. Siti Aminah'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Hapus data dari tabel Dosbing
    await queryInterface.bulkDelete('dosbing', null, {});
  }
};
