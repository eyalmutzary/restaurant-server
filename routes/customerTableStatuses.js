const express = require("express");
const router = express.Router();
const {
    getAllCustomerTableStatuses,
    createNewCustomerTableStatus,
    updateCustomerTableStatusValue,
    deleteCustomerTableStatus,
} = require("../controllers/customerTableStatuses");
const extractAuthorizationToken = require("../middlewares/extractAuthorizationToken");

router.get("/", extractAuthorizationToken, getAllCustomerTableStatuses);
router.post(
  "/",
  extractAuthorizationToken,
  createNewCustomerTableStatus
);
router.patch("/", extractAuthorizationToken, updateCustomerTableStatusValue);
router.delete("/", extractAuthorizationToken, deleteCustomerTableStatus);

module.exports = router;
