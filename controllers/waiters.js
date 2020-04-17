const { Waiters } = require("../models");

// Get all waiters
const getAllWaiters = async (req, res, next) => {
  try {
    const waiters = await Waiters.findAll();
    res.send(waiters);
  } catch (err) {
    next(err);
  }
};

// Create new waiter
const createNewWaiter = async (req, res, next) => {
  try {
    const newWaiter = await Waiters.create({ ...req.body });
    res.send(newWaiter);
  } catch (err) {
    next(err);
  }
};

// Update waiter name
const updateWaiterName = async (req, res, next) => {
  try {
    const updatedWaiter = await Waiters.update(
      { name: req.body.name },
      {
        where: {
          id: req.query.id,
        },
      }
    );
    res.send(updatedWaiter);
  } catch (err) {
    next(err);
  }
};

// Delete waiter by query param - id
const deleteWaiter = async (req, res, next) => {
  try {
    const deleteWaiter = await Waiters.destroy({
      where: { id: req.query.id },
    });
    if (deleteWaiter === 1) {
      res.status(200).send("Waiter Deleted.");
    }
    res.status(200).send("Waiter Id not found.");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllWaiters,
  createNewWaiter,
  updateWaiterName,
  deleteWaiter,
};
