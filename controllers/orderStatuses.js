const { OrderStatuses } = require("../models");

// Get all statuses
const getAllOrderStatuses = async (req, res, next) => {
  try {
    const statuses = await OrderStatuses.findAll();
    res.send(statuses);
  } catch (err) {
    next(err);
  }
};

// Create new status
const createNewOrderStatus = async (req, res, next) => {
  try {
    const newStatus = await OrderStatuses.create({ ...req.body });
    res.send(newStatus);
  } catch (err) {
    next(err);
  }
};

// Update OrderStatus value
const updateOrderStatusValue = async (req, res, next) => {
  try {
    const updateStatus = await OrderStatuses.update(
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

// Delete OrderStatus by query param - id
const deleteOrderStatus = async (req, res, next) => {
  try {
    const deleteStatus = await OrderStatuses.destroy({
      where: { id: req.query.id },
    });
    if (deleteStatus === 1) {
      res.status(200).send("Status Deleted.");
    }
    res.status(200).send("Status Id not found.");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllOrderStatuses,
  createNewOrderStatus,
  updateOrderStatusValue,
  deleteOrderStatus,
};
