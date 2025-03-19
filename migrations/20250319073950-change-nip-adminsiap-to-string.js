module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('admin_siap', 'NIP_admin_siap', {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('admin_siap', 'NIP_admin_siap', {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    });
  }
};
