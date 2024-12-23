'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hapus foreign key constraint terlebih dahulu
    await queryInterface.removeConstraint('mahasiswa', 'mahasiswa_NIP_dosbing_fkey1');

    // Ubah tipe data kolom NIP_dosbing pada tabel mahasiswa
    await queryInterface.changeColumn('mahasiswa', 'NIP_dosbing', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Tambahkan kembali foreign key constraint dengan tipe data yang cocok
    await queryInterface.addConstraint('mahasiswa', {
      fields: ['NIP_dosbing'],
      type: 'foreign key',
      name: 'mahasiswa_NIP_dosbing_fkey1',
      references: {
        table: 'dosbing',
        field: 'NIP_dosbing',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Hapus foreign key constraint
    await queryInterface.removeConstraint('mahasiswa', 'mahasiswa_NIP_dosbing_fkey1');

    // Kembalikan tipe data kolom NIP_dosbing ke BIGINT
    await queryInterface.changeColumn('mahasiswa', 'NIP_dosbing', {
      type: Sequelize.BIGINT,
      allowNull: false,
    });

    // Tambahkan kembali foreign key constraint dengan tipe data BIGINT
    await queryInterface.addConstraint('mahasiswa', {
      fields: ['NIP_dosbing'],
      type: 'foreign key',
      name: 'mahasiswa_NIP_dosbing_fkey1',
      references: {
        table: 'dosbing',
        field: 'NIP_dosbing',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
};
