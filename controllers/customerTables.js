const {
  CustomerTables,
  CustomerTableStatuses,
  Orders,
  OrderedProducts,
  OrderStatuses,
  Products,
} = require("../models");
const { sumBy } = require("lodash");

const getCustomerTable = async (req, res, next) => {
  try {
    if (Object.keys(req.query).length === 0) {
      console.log("bam@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      customerTables = await CustomerTables.findAll({
        include: [CustomerTableStatuses],
      });
    } else {
      const [[key, value]] = Object.entries(req.query);
      switch (key) {
        case "status": {
          const status = await CustomerTableStatuses.findOne({
            where: { status: value },
          });
          customerTables = await CustomerTables.findAll({
            where: { CustomerTableStatusId: status.id },
            include: [CustomerTableStatuses],
          });
          break;
        }
        case "tableNum": {
          customerTables = await CustomerTables.findOne({
            where: { tableNum: value },
            include: [CustomerTableStatuses],
          });
          break;
        }
        case "id": {
          customerTables = await CustomerTables.findOne({
            where: { id: value },
            include: [CustomerTableStatuses],
          });
          break;
        }
        default: {
          customerTables = await CustomerTables.findAll({
            include: [CustomerTableStatuses],
          });
          break;
        }
      }
    }
    res.send(customerTables);
  } catch (err) {
    next(err);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const orders = await Orders.findAll({
      include: [
        {
          model: OrderedProducts,
          include: [{ model: Products, required: true }],
        },
        {
          model: OrderStatuses,
        },
      ],
      where: { CustomerTableId: req.query.id },
    });
    let tableSum = 0;
    // orders.forEach(({ OrderedProducts }) => {
    //   tableSum += sumBy(OrderedProducts, "Product.price");
    // });
    // orders["totalTablePrice"] = tableSum;
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};

// Create new CustomerTable Table
const createNewCustomerTable = async (req, res, next) => {
  try {
    const customerTableStatus = await CustomerTableStatuses.findOne({
      where: { status: req.body.status },
    });
    const table = await CustomerTables.create({
      ...req.body,
      CustomerTableStatusId: customerTableStatus.id,
    });

    res.status(200).send("Table Added");
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
  getProducts,
  createNewCustomerTable,
  updateCustomerTable,
  deleteCustomerTable,
};
