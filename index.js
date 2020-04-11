const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

// DBConnection

switch (process.env.NODE_ENV) {
  case "production":
    app.listen(process.env.PORT);
    break;
  case "development":
    app.listen(process.env.PORT);
    console.log(`Server Port: ${process.env.PORT}`);
    break;
  case "test":
    break;
  default:
    console.log("Unrecognized node environment");
    break;
}

app.use(router);

app.use((err, req, res) => {
  console.log("Unexpected Error", err.stack);
  res.status(500).send({ err });
});

module.exports = app;
