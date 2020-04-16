module.exports = (sequelize, DataTypes) => {
  var Orders = sequelize.define(
    "Orders",
    {
      // Add columns for connections: CustomerTableId, WaiterId, OrderStatusId
    },
    {
      timestamps: true,
      tableName: "Orders",
    }
  );

  return Orders;
};
