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

  return Waiters;
}

