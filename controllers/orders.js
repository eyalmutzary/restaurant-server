const { Orders } = require("../models");

const getOrders = async (req, res, next) => {
  try {
    console.log(req.query.customerTableId);
    switch (true) {
      case req.query.customerTableId != undefined: {
        orders = await Orders.findAll({
          where: { CustomerTableId: req.query.customerTableId },
        });
        break;
      }
      case req.query.waiterId != undefined: {
        orders = await Orders.findAll({
          where: { WaiterId: req.query.waiterId },
        });
        break;
      }
      case req.query.orderStatusId != undefined: {
        orders = await Orders.findAll({
          where: { OrderStatusId: req.query.orderStatusId },
        });
        break;
      }
      case req.query.id != undefined: {
        orders = await Orders.findOne({ where: { id: req.query.id } });
        break;
      }
      default: {
        orders = await Orders.findAll();
      }
    }

    res.send(orders);
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
  createNewOrder,
  updateOrder,
  deleteOrder,
};
