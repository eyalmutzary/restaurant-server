const jwt = require("jsonwebtoken");

const sign = data =>
  jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION_TIME
  });

const verify = token => jwt.verify(token, process.env.JWT_SECRET);

module.exports = { sign, verify };
