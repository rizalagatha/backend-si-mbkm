'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('pendaftaran_mbkm', 'id_matkul_knvrs', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'matkul_knvrs',
        key: 'id_matkul_knvrs',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('pendaftaran_mbkm', 'id_matkul_knvrs');
  },
};
