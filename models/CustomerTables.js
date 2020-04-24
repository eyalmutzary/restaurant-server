module.exports = (sequelize, DataTypes) => {
  var CustomerTables = sequelize.define(
    "CustomerTables",
    {
      tableNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          isNumeric: true,
        },
      },
      diners: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          isNumeric: true,
        },
      },
      note: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
      tableName: "CustomerTables",
    }
  );

  CustomerTables.associate = function (models) {
    CustomerTables.hasMany(models.Orders, {
      foreignKey: { allowNull: false },
    });
    CustomerTables.belongsTo(models.CustomerTableStatuses, {
      foreignKey: { allowNull: false },
    });
  };

  return CustomerTables;
};
