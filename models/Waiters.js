module.exports = (sequelize, DataTypes) => {
  var Waiters = sequelize.define(
    'Waiters',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        },
      }
    },
    {
      timestamps: false,
      tableName: 'Waiters'
    }
  );

  Waiters.associate = function (models) {
    Waiters.hasMany(models.Orders, {
      foreignKey: { allowNull: false },
    });
  };

  return Waiters;
}

