const express = require("express");
const router = express.Router();
const {
  getProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const extractAuthorizationToken = require("../middlewares/extractAuthorizationToken");

router.get("/", extractAuthorizationToken, getProducts);
router.post("/", extractAuthorizationToken, createNewProduct);
router.patch("/", extractAuthorizationToken, updateProduct);
router.delete("/", extractAuthorizationToken, deleteProduct);

module.exports = router;
