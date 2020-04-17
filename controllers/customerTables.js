const { CustomerTables } = require("../models");

const getCustomerTable = async (req, res, next) => {
  try {
    // const customerTables = null;
    if (req.query.customerTableStatusId) {
      customerTables = await CustomerTables.findAll({
        where: { CustomerTableStatusId: req.query.customerTableStatusId },
      });
    } else {
      if (req.query.id) {
        customerTables = await CustomerTables.findOne({
          where: { id: req.query.id },
        });
      } else {
        customerTables = await CustomerTables.findAll();
      }
    }
    res.send(customerTables);
  } catch (err) {
    next(err);
  }
};

// Create new CustomerTable Table
const createNewCustomerTable = async (req, res, next) => {
  try {
    const newCustomerTable = await CustomerTables.create({ ...req.body });
    res.status(200).send(newCustomerTable);
  } catch (err) {
    next(err);
  }
};

// Update CustomerTable
const updateCustomerTable = async (req, res, next) => {
  try {
    const updateCustomerTable = await CustomerTables.update(
      { ...req.body },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    res.send(updateCustomerTable);
  } catch (err) {
    next(err);
  }
};

// Delete Customer Table by query param - id
const deleteCustomerTable = async (req, res, next) => {
  try {
    const deleteCustomerTable = await CustomerTables.destroy({
      where: { id: req.query.id },
    });
    if (deleteCustomerTable === 1) {
      res.status(200).send("Customer Table Deleted.");
    }
    res.status(400).send("Customer Table Id not found.");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCustomerTable,
  createNewCustomerTable,
  updateCustomerTable,
  deleteCustomerTable,
};
