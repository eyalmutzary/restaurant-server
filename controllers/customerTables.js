const {
  CustomerTables,
  CustomerTableStatuses,
  Orders,
  OrderedProducts,
  OrderStatuses,
  Products,
} = require("../models");

const sequelize = require("sequelize");

const getCustomerTable = async (req, res, next) => {
  try {
    const statusClosed = await CustomerTableStatuses.findOne({
      where: { status: "closed" },
    });
    if (Object.keys(req.query).length === 0) {
      customerTables = await CustomerTables.findAll({
        where: {
          CustomerTableStatusId: {
            [sequelize.Op.not]: statusClosed.id,
          },
        },
        include: [CustomerTableStatuses],
        order: ["tableNum"],
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
            order: ["updatedAt", "tableNum"],
          });
          break;
        }
        case "tableNum": {
          customerTables = await CustomerTables.findOne({
            where: {
              tableNum: value,
              CustomerTableStatusId: {
                [sequelize.Op.not]: statusClosed.id,
              },
            },
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
            where: {
              CustomerTableStatusId: {
                [sequelize.Op.not]: statusClosed.id,
              },
            },
            include: [CustomerTableStatuses],
            order: ["tableNum"],
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
    let tableId;
    if (!req.query.id) {
      const customerTable = await CustomerTables.findOne({
        where: { tableNum: req.query.tableNum },
      });
      tableId = customerTable.id;
    } else {
      tableId = req.query.id;
    }
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
      where: { CustomerTableId: tableId },
    });
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};

// Create new CustomerTable Table
const createNewCustomerTable = async (req, res, next) => {
  try {
    const customerTables = await CustomerTables.findAll({
      where: { tableNum: req.body.tableNum, isActive: true },
    });
    if (customerTables.length !== 0) {
      res.status(403).send("Table Number already open.");
    } else {
      const customerTableStatus = await CustomerTableStatuses.findOne({
        where: { status: req.body.status },
      });
      const table = await CustomerTables.create({
        ...req.body,
        isActive: true,
        CustomerTableStatusId: customerTableStatus.id,
      });
      res.status(200).send("Table Added");
    }
  } catch (err) {
    next(err);
  }
};

// Update CustomerTable
const updateCustomerTable = async (req, res, next) => {
  try {
    let tableId;
    if (!req.query.id) {
      const customerTable = await CustomerTables.findOne({
        where: { tableNum: req.query.tableNum },
      });
      tableId = customerTable.id;
    } else {
      tableId = req.query.id;
    }
    if (req.body.status) {
      const status = await CustomerTableStatuses.findOne({
        where: { status: req.body.status },
      });
    }
    const updateCustomerTable = await CustomerTables.update(
      { CustomerTableStatusId: status.id, ...req.body },
      {
        where: {
          id: tableId,
        },
      }
    );
    res.send(updateCustomerTable);
  } catch (err) {
    next(err);
  }
};

// Update CustomerTable status
const updateCustomerTableStatus = async (req, res, next) => {
  try {
    let tableId;
    if (!req.query.id) {
      const customerTable = await CustomerTables.findOne({
        where: { tableNum: req.query.tableNum },
      });
      tableId = customerTable.id;
    } else {
      tableId = req.query.id;
    }
    const status = await CustomerTableStatuses.findOne({
      where: { status: req.body.status },
    });
    const isTableStillActive = req.body.status !== "closed";
    const updateCustomerTable = await CustomerTables.update(
      { CustomerTableStatusId: status.id, isActive: isTableStillActive },
      {
        where: {
          id: tableId,
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
  updateCustomerTableStatus,
  deleteCustomerTable,
};
