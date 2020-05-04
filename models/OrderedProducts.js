module.exports = (sequelize, DataTypes) => {
  var OrderedProducts = sequelize.define(
    "OrderedProducts",
    {
      note: {
        type: DataTypes.STRING,
      },
      // Add columns for connections: productId, orderId
    },
    {
      timestamps: true,
      tableName: "OrderedProducts",
    }
  );

  OrderedProducts.associate = function (models) {
    OrderedProducts.belongsTo(models.Products, {
      foreignKey: { allowNull: false },
    });
    OrderedProducts.belongsTo(models.Orders, {
      foreignKey: { allowNull: false },
    });
  };
  return OrderedProducts;
};
