const express = require("express");
const waiterRoutes = require("./waiters");
const authRoutes = require("./auth");

const router = express.Router();

router.use("/test", (req, res) => res.send("Hello World"));

router.use("/waiters", waiterRoutes);

router.use("/auth", authRoutes);

module.exports = router;
