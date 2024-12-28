'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('pendaftaran_mbkm', 'NIP_dosbing', {
      type: Sequelize.STRING,
      allowNull: true,
      references: {
        model: 'dosbing',
        key: 'NIP_dosbing',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('pendaftaran_mbkm', 'NIP_dosbing');
  },
};
