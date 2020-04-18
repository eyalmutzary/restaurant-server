const express = require("express");
const router = express.Router();
const {
    getOrders,
    createNewOrder,
    updateOrder,
    deleteOrder,
} = require("../controllers/orders");
const extractAuthorizationToken = require("../middlewares/extractAuthorizationToken");

router.get("/", extractAuthorizationToken, getOrders);
router.post("/", extractAuthorizationToken, createNewOrder);
router.patch("/", extractAuthorizationToken, updateOrder);
router.delete("/", extractAuthorizationToken, deleteOrder);

module.exports = router;
