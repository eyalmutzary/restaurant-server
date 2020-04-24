const express = require("express");
const router = express.Router();
const { login } = require("../controllers/auth");

router.post("/loginWaiter", login);

// router.post("/signup", signUp);

module.exports = router;
