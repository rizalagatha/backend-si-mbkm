'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matkul_knvrs', {
      id_matkul_knvrs: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nama_matkul: {
        type: Sequelize.STRING,
        allowNull: false
      },
      kode_matkul: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sks: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matkul_knvrs');
  }
};
