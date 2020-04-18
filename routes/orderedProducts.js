const express = require("express");
const router = express.Router();
const {
  getOrderedProducts,
  createNewOrderedProduct,
  updateOrderedProduct,
  deleteOrderedProduct,
} = require("../controllers/orderedProducts");
const extractAuthorizationToken = require("../middlewares/extractAuthorizationToken");

router.get("/", extractAuthorizationToken, getOrderedProducts);
router.post("/", extractAuthorizationToken, createNewOrderedProduct);
router.patch("/", extractAuthorizationToken, updateOrderedProduct);
router.delete("/", extractAuthorizationToken, deleteOrderedProduct);

module.exports = router;
