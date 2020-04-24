const {
  Orders,
  OrderedProducts,
  OrderStatuses,
  Products,
  CustomerTables,
} = require("../models");
const sequelize = require("sequelize");
const { sumBy } = require("lodash");

const getOrders = async (req, res, next) => {
  try {
    if (Object.keys(req.query).length === 0) {
      orders = await Orders.findAll();
    } else {
      const [[key, value]] = Object.entries(req.query);
      switch (key) {
        case "customerTableId": {
          orders = await Orders.findAll({
            where: { CustomerTableId: value },
          });
          break;
        }
        case "customerTableNum": {
          await CustomerTables.findOne({
            where: { tableNum: value },
          }).then(async ({ id }) => {
            orders = await Orders.findAll({
              where: { CustomerTableId: id },
            });
          });
          break;
        }
        case "waiterId": {
          orders = await Orders.findAll({
            where: { WaiterId: value },
          });
          break;
        }
        case "orderStatusId": {
          orders = await Orders.findAll({
            where: { OrderStatusId: value },
          });
          break;
        }
        case "id": {
          orders = await Orders.findOne({ where: { id: value } });
          break;
        }
        default: {
          orders = await Orders.findAll();
        }
      }
    }

    res.send(orders);
  } catch (err) {
    next(err);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const orderedProducts = await OrderedProducts.findAll({
      where: { OrderId: req.query.id },
      include: [
        {
          model: Products,
          required: true,
          attributes: ["name", "price", "inStock"],
        },
      ],
    });
    orderedProducts["totalOrderPrice"] = sumBy(
      orderedProducts,
      "Product.price"
    );
    res.status(200).send(orderedProducts);
  } catch (err) {
    next(err);
  }
};

const createNewOrder = async (req, res, next) => {
  try {
    const newOrder = await Orders.create({ ...req.body });
    res.status(200).send(newOrder);
  } catch (err) {
    next(err);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const updateOrder = await Orders.update(
      { ...req.body },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    res.send(updateOrder);
  } catch (err) {
    next(err);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const status = await OrderStatuses.findOne({
      where: { status: req.body.status },
    }).then(async ({ id }) => {
      await Orders.update(
        { OrderStatusId: id },
        {
          where: {
            id: req.body.id,
          },
        }
      );
    });
    res.status(200).send("Order status updated.");
  } catch (err) {
    next(err);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const deleteOrder = await Orders.destroy({
      where: { id: req.query.id },
    });
    if (deleteOrder === 1) {
      res.status(200).send("Order Deleted.");
    }
    res.status(400).send("Order Id not found.");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getOrders,
  getProducts,
  createNewOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
};
