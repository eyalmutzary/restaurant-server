const express = require("express");
const authRoutes = require("./auth");
const waitersRoutes = require("./waiters");
const categoriesRoutes = require("./categories");
const orderStatuses = require("./orderStatuses");
const orders = require("./orders");
const customerTableStatuses = require("./customerTableStatuses");
const customerTables = require("./customerTables");
const products = require("./products");
const orderedProducts = require("./orderedProducts");

const router = express.Router();

router.use("/test", (req, res) => res.send("Hello World"));
router.use("/auth", authRoutes);

router.use("/waiters", waitersRoutes);
router.use("/categories", categoriesRoutes);
router.use("/orderStatuses", orderStatuses);
router.use("/orders", orders);
router.use("/customerTableStatuses", customerTableStatuses);
router.use("/customerTables", customerTables);
router.use("/products", products);
router.use("/orderedProducts", orderedProducts);

module.exports = router;
