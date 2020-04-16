module.exports = (sequelize, DataTypes) => {
  var Categories = sequelize.define(
    "Categories",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      timestamps: false,
      tableName: "Categories",
    }
  );

  Categories.associate = function (models) {
    Categories.hasMany(models.Products, {
      foreignKey: { allowNull: false },
    });
  };

  return Categories;
};
