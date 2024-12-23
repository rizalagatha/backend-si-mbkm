'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Menghapus foreign key constraint sementara
    await queryInterface.removeConstraint('pengumuman', 'pengumuman_NIP_koor_mbkm_fkey');

    // 2. Mengubah tipe data NIP_koor_mbkm di tabel koor_mbkm menjadi VARCHAR
    await queryInterface.changeColumn('koor_mbkm', 'NIP_koor_mbkm', {
      type: Sequelize.STRING,  // VARCHAR setara dengan STRING di Sequelize
      allowNull: true,  // Sesuaikan dengan constraint Anda (jika ada)
    });

    // 3. Mengubah tipe data NIP_koor_mbkm di tabel pengumuman menjadi VARCHAR
    await queryInterface.changeColumn('pengumuman', 'NIP_koor_mbkm', {
      type: Sequelize.STRING,
      allowNull: true,  // Sesuaikan dengan constraint Anda (jika ada)
    });

    // 4. Menambahkan kembali foreign key constraint
    await queryInterface.addConstraint('pengumuman', {
      fields: ['NIP_koor_mbkm'],
      type: 'foreign key',
      name: 'pengumuman_NIP_koor_mbkm_fkey',  // Pastikan nama constraint sama dengan sebelumnya
      references: {
        table: 'koor_mbkm',
        field: 'NIP_koor_mbkm'
      },
      onDelete: 'CASCADE',  // Sesuaikan dengan kebutuhan
      onUpdate: 'CASCADE'   // Sesuaikan dengan kebutuhan
    });
  },

  down: async (queryInterface, Sequelize) => {
    // 1. Menghapus foreign key constraint
    await queryInterface.removeConstraint('pengumuman', 'pengumuman_NIP_koor_mbkm_fkey');

    // 2. Mengembalikan tipe data NIP_koor_mbkm di tabel koor_mbkm ke BIGINT
    await queryInterface.changeColumn('koor_mbkm', 'NIP_koor_mbkm', {
      type: Sequelize.BIGINT,
      allowNull: true,
    });

    // 3. Mengembalikan tipe data NIP_koor_mbkm di tabel pengumuman ke BIGINT
    await queryInterface.changeColumn('pengumuman', 'NIP_koor_mbkm', {
      type: Sequelize.BIGINT,
      allowNull: true,
    });

    // 4. Menambahkan kembali foreign key constraint dengan tipe data BIGINT
    await queryInterface.addConstraint('pengumuman', {
      fields: ['NIP_koor_mbkm'],
      type: 'foreign key',
      name: 'pengumuman_NIP_koor_mbkm_fkey',
      references: {
        table: 'koor_mbkm',
        field: 'NIP_koor_mbkm'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  }
};
