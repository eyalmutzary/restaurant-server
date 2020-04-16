const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const router = require("./routes");
const models = require("./models"); // test

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(router);

// models.sequelize
//   .sync({ force: true })
//   .then((result) => {
//     app.listen(process.env.POSTGRES_PORT);
//     console.log(`Server Port: ${process.env.POSTGRES_PORT}`);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

switch (process.env.NODE_ENV) {
  case "production":
    console.log("production")
    app.listen(process.env.POSTGRES_PORT);
    break;
  case "development":
    app.listen(process.env.POSTGRES_PORT);
    models.sequelize
      .sync({ force: true })
      .then((result) => {
        console.log("server synced");
        console.log(`Server Port: ${process.env.POSTGRES_PORT}`);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(`Server Port: ${process.env.POSTGRES_PORT}`);
    break;
  case "test":
    break;
  default:
    console.log("Unrecognized node environment");
    break;
}

app.use((err, req, res) => {
  console.log("Unexpected Error", err.stack);
  res.status(500).send({ err });
});

module.exports = app;
