'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('mahasiswa', {
      fields: ['NIP_dosbing'],
      type: 'foreign key',
      name: 'mahasiswa_NIP_dosbing_fkey', // Pastikan nama constraint
      references: {
        table: 'dosbing',
        field: 'NIP_dosbing',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('mahasiswa', 'mahasiswa_NIP_dosbing_fkey');
  }
};
