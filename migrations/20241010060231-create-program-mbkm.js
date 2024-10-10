'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('program_mbkm', {
      id_program_mbkm: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      company: {
        type: Sequelize.STRING,
        allowNull: false
      },
      deskripsi: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      role: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      category_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'categories', // Referencing the categories table
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('program_mbkm');
  }
};
