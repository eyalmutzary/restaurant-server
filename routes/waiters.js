const express = require("express");
const router = express.Router();
const {
  getAllWaiters,
  createNewWaiter,
  updateWaiterName,
  deleteWaiter,
} = require("../controllers/waiters");
const extractAuthorizationToken = require("../middlewares/extractAuthorizationToken");

router.get("/", extractAuthorizationToken, getAllWaiters);
router.post("/createWaiter", extractAuthorizationToken, createNewWaiter);
router.patch("/", extractAuthorizationToken, updateWaiterName);
router.delete("/", extractAuthorizationToken, deleteWaiter);

module.exports = router;
