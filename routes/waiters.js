const express = require("express");
const router = express.Router();
const { getWaiters, deleteWaiter } = require("../controllers/waiters");
const extractAuthorizationToken = require("../middlewares/extractAuthorizationToken");

router.get("/", extractAuthorizationToken, getWaiters);

router.delete("/", extractAuthorizationToken, deleteWaiter);

module.exports = router;
