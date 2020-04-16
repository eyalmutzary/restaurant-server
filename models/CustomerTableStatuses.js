module.exports = (sequelize, DataTypes) => {
  var CustomerTableStatuses = sequelize.define(
    "CustomerTableStatuses",
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        },
      },
    },
    {
      timestamps: false,
      tableName: "CustomerTableStatuses",
    }
  );

  CustomerTableStatuses.associate = function (models) {
    CustomerTableStatuses.hasMany(models.CustomerTables, {
      foreignKey: { allowNull: false },
    });
  };

  return CustomerTableStatuses;
};
