const express = require("express");
const router = express.Router();
const {
  getAllOrderStatuses,
  createNewOrderStatus,
  updateOrderStatusValue,
  deleteOrderStatus,
} = require("../controllers/orderStatuses");
const extractAuthorizationToken = require("../middlewares/extractAuthorizationToken");

router.get("/", extractAuthorizationToken, getAllOrderStatuses);
router.post(
  "/createOrderStatus",
  extractAuthorizationToken,
  createNewOrderStatus
);
router.patch("/", extractAuthorizationToken, updateOrderStatusValue);
router.delete("/", extractAuthorizationToken, deleteOrderStatus);

module.exports = router;
