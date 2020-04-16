module.exports = (sequelize, DataTypes) => {
  // Add categoryId connection
  var Products = sequelize.define(
    "Products",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          isNumeric: true,
        },
      },
      inStock: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      tableName: "Products",
    }
  );

  Products.associate = function (models) {
    Products.hasMany(models.OrderedProducts, {
      foreignKey: { allowNull: false },
    });
  };

  return Products;
};
