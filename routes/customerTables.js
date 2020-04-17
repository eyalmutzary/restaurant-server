const express = require("express");
const router = express.Router();
const {
    getCustomerTable,
    createNewCustomerTable,
    updateCustomerTable,
    deleteCustomerTable,
} = require("../controllers/customerTables");
const extractAuthorizationToken = require("../middlewares/extractAuthorizationToken");

router.get("/", extractAuthorizationToken, getCustomerTable);
router.post("/", extractAuthorizationToken, createNewCustomerTable);
router.patch("/", extractAuthorizationToken, updateCustomerTable);
router.delete("/", extractAuthorizationToken, deleteCustomerTable);

module.exports = router;
