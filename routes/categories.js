const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  createNewCategories,
  updateCategoryName,
  deleteCategory,
} = require("../controllers/categories");
const extractAuthorizationToken = require("../middlewares/extractAuthorizationToken");

router.get("/", extractAuthorizationToken, getAllCategories);
router.post("/createCategory", extractAuthorizationToken, createNewCategories);
router.patch("/", extractAuthorizationToken, updateCategoryName);
router.delete("/", extractAuthorizationToken, deleteCategory);

module.exports = router;
