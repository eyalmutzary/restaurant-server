const express = require("express");
const router = express.Router();
const {
  getOrderedProducts,
  getProductDetails,
  createNewOrderedProduct,
  updateOrderedProduct,
  deleteOrderedProduct,
} = require("../controllers/orderedProducts");
const extractAuthorizationToken = require("../middlewares/extractAuthorizationToken");

router.get("/", extractAuthorizationToken, getOrderedProducts);
router.get("/product", extractAuthorizationToken, getProductDetails);
router.post("/", extractAuthorizationToken, createNewOrderedProduct);
router.patch("/", extractAuthorizationToken, updateOrderedProduct);
router.delete("/", extractAuthorizationToken, deleteOrderedProduct);

module.exports = router;
