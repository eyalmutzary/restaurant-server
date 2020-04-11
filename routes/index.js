const express = require("express");
const userRoutes = require("./users");
const authRoutes = require("./auth");

const router = express.Router();

router.use("/test", (req, res) => res.send("Hello World"));

router.use("/users", userRoutes);

router.use("/auth", authRoutes);

module.exports = router;
