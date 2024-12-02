module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'categories',
    timestamps: false,
  });

  // Relasi dengan ProgramMbkm
  Categories.associate = (models) => {
    Categories.hasMany(models.ProgramMbkm, { foreignKey: 'category_id', as: 'programs' });
  };

  return Categories;
};
