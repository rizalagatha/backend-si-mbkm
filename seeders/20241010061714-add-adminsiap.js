'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert data ke dalam tabel AdminSiap
    await queryInterface.bulkInsert('admin_siap', [
      {
        NIP_admin_siap: 654321,
        nama_admin_siap: 'Admin A'
      },
      {
        NIP_admin_siap: 654322,
        nama_admin_siap: 'Admin B'
      },
      {
        NIP_admin_siap: 654323,
        nama_admin_siap: 'Admin C'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Hapus data dari tabel AdminSiap
    await queryInterface.bulkDelete('admin_siap', null, {});
  }
};
