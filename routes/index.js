const express = require("express");
const waitersRoutes = require("./waiters");
const authRoutes = require("./auth");
const categoriesRoutes = require("./categories");
const orderStatuses = require("./orderStatuses");
const customerTableStatuses = require("./customerTableStatuses");

const router = express.Router();

router.use("/test", (req, res) => res.send("Hello World"));

router.use("/waiters", waitersRoutes);
router.use("/categories", categoriesRoutes);
router.use("/orderStatuses", orderStatuses);
router.use("/customerTableStatuses", customerTableStatuses);
router.use("/auth", authRoutes);

module.exports = router;
