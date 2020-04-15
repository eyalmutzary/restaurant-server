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

  return OrderedProducts;
};
