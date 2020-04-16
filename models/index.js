const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const db = {};

console.log(
  process.env.POSTGRES_DATABASE_NAME,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD
);

const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE_NAME,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: process.env.POSTGRES_SSL === "true" ? true : false,
    },
    sync: { force: true },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
console.log("succeed");

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
