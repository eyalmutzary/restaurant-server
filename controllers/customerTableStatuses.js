const { CustomerTableStatuses } = require("../models");

// Get all statuses
const getAllCustomerTableStatuses = async (req, res, next) => {
  try {
    const statuses = await CustomerTableStatuses.findAll();
    res.send(statuses);
  } catch (err) {
    next(err);
  }
};

// Create new status
const createNewCustomerTableStatus = async (req, res, next) => {
  try {
    const newStatus = await CustomerTableStatuses.create({ ...req.body });
    res.send(newStatus);
  } catch (err) {
    next(err);
  }
};

// Update CustomerTableStatus value
const updateCustomerTableStatusValue = async (req, res, next) => {
  try {
    const updateStatus = await CustomerTableStatuses.update(
      { status: req.body.status },
      {
        where: {
          id: req.query.id,
        },
      }
    );
    res.send(updateStatus);
  } catch (err) {
    next(err);
  }
};

// Delete CustomerTableStatus by query param - id
const deleteCustomerTableStatus = async (req, res, next) => {
  try {
    const deleteStatus = await CustomerTableStatuses.destroy({
      where: { id: req.query.id },
    });
    if (deleteStatus === 1) {
      res.status(200).send("Status Deleted.");
    }
    res.status(400).send("Status Id not found.");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCustomerTableStatuses,
  createNewCustomerTableStatus,
  updateCustomerTableStatusValue,
  deleteCustomerTableStatus,
};
