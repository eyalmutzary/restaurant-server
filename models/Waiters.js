const jwtService = require("../services/jwt");

module.exports = (sequelize, DataTypes) => {
  var Waiters = sequelize.define(
    "Waiters",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      timestamps: false,
      tableName: "Waiters",
    }
  );

  Waiters.associate = function (models) {
    Waiters.hasMany(models.Orders, {
      foreignKey: { allowNull: true },
    });
  };

  Waiters.prototype.createAuthorizationToken = () =>
    jwtService.sign({ waiter_id: this.id });

  return Waiters;
};
