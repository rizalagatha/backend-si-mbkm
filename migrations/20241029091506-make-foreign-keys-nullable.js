'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Mengubah kolom id_program_mbkm menjadi nullable
    await queryInterface.changeColumn('mahasiswa', 'id_program_mbkm', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'program_mbkm', // Nama tabel referensi
        key: 'id_program_mbkm'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    // Mengubah kolom NIP_dosbing menjadi nullable
    await queryInterface.changeColumn('mahasiswa', 'NIP_dosbing', {
      type: Sequelize.BIGINT,
      allowNull: true,
      references: {
        model: 'dosbing', // Nama tabel referensi
        key: 'NIP_dosbing'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down(queryInterface, Sequelize) {
    // Mengembalikan perubahan agar foreign key kembali menjadi non-nullable
    await queryInterface.changeColumn('mahasiswa', 'id_program_mbkm', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'program_mbkm',
        key: 'id_program_mbkm'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.changeColumn('mahasiswa', 'NIP_dosbing', {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'dosbing',
        key: 'NIP_dosbing'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  }
};
