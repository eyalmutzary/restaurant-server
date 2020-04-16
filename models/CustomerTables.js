module.exports = (sequelize, DataTypes) => {

    // Add customerTableStatusId column
  var CustomerTables = sequelize.define(
    "CustomerTables",
    {
      tableNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isNumeric: true,
        },
      },
      diners: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
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
        tableName: 'CustomerTables',
    }
  );

  CustomerTables.associate = function (models) {
    CustomerTables.hasMany(models.Orders, {
      foreignKey: { allowNull: false },
    });
  };

  return CustomerTables;
};
