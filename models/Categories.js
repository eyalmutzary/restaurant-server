module.exports = (sequelize, DataTypes) => {
    var Categories = sequelize.define(
      'Categories',
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
        tableName: 'Categories'
      }
    );
  
    return Categories;
  }
  
  
