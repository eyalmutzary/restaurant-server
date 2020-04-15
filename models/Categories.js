module.exports = (sequelize, DataTypes) => {
    var Orders = sequelize.define(
      'Orders',
      {
        // Add columns for connections: tableId, waiterId, orderStatusId
      },
      {
        timestamps: true,
        tableName: 'Orders'
      }
    );
  
    return Orders;
  }
  
  
