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

switch (process.env.NODE_ENV) {
  case "production":
    console.log("production");
    app.listen(process.env.SERVER_PORT);
    break;
  case "development":
    app.listen(process.env.SERVER_PORT);
    models.sequelize
      .sync({ force: false })
      .then((result) => {
        console.log("server synced");
        console.log(`Server Port: ${process.env.SERVER_PORT}`);
      })
      .catch((err) => {
        console.log(err);
      });
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
