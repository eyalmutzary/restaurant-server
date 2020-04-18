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

  Orders.associate = function (models) {
    Orders.hasMany(models.OrderedProducts, {
      foreignKey: { allowNull: false },
    });
    Orders.belongsTo(models.CustomerTables, {
      foreignKey: { allowNull: false },
    });
    // Orders.belongsTo(models.Waiters, {
    //   foreignKey: { allowNull: false },
    // });
    // Orders.belongsTo(models.OrderStatuses, {
    //   foreignKey: { allowNull: false },
    // });
  };

  return Orders;
};
