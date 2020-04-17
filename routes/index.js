const express = require("express");
const authRoutes = require("./auth");
const waitersRoutes = require("./waiters");
const categoriesRoutes = require("./categories");
const orderStatuses = require("./orderStatuses");
const customerTableStatuses = require("./customerTableStatuses");
const customerTables = require("./customerTables");
const products = require("./products");

const router = express.Router();

router.use("/test", (req, res) => res.send("Hello World"));
router.use("/auth", authRoutes);

router.use("/waiters", waitersRoutes);
router.use("/categories", categoriesRoutes);
router.use("/orderStatuses", orderStatuses);
router.use("/customerTableStatuses", customerTableStatuses);
router.use("/customerTables", customerTables);
router.use("/products", products);

module.exports = router;
