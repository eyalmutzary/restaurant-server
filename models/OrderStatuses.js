module.exports = (sequelize, DataTypes) => {
    var OrderStatuses = sequelize.define(
      'OrderStatuses',
      {
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: true
          },
        }
      },
      {
        timestamps: false,
        tableName: 'OrderStatuses'
      }
    );

    OrderStatuses.associate = function (models) {
      OrderStatuses.hasMany(models.Orders, {
        foreignKey: { allowNull: false },
      });
    };

    return OrderStatuses;
}

