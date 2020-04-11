const express = require("express");
const router = express.Router();
const { getUsers, deleteUser } = require("../controllers/users");
const extractAuthorizationToken = require("../middlewares/extractAuthorizationToken");

router.get("/", extractAuthorizationToken, getUsers);

router.delete("/", extractAuthorizationToken, deleteUser);

module.exports = router;
