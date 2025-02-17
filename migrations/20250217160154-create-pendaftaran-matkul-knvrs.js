module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pendaftaran_matkul_knvrs', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      id_pendaftaran_mbkm: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pendaftaran_mbkm',
          key: 'id_pendaftaran_mbkm'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_matkul_knvrs: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'matkul_knvrs',
          key: 'id_matkul_knvrs'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pendaftaran_matkul_knvrs');
  }
};
