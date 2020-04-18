const { OrderedProducts } = require("../models");

const getOrderedProducts = async (req, res, next) => {
  try {
    switch (true) {
      case req.query.productId != undefined: {
        orderedProducts = await OrderedProducts.findAll({
          where: { ProductId: req.query.productId },
        });
        break;
      }
      case req.query.orderId != undefined: {
        orderedProducts = await OrderedProducts.findAll({
          where: { OrderId: req.query.orderId },
        });
        break;
      }
      default: {
        orderedProducts = await OrderedProducts.findAll();
      }
    }

    res.send(orderedProducts);
  } catch (err) {
    next(err);
  }
};

const createNewOrderedProduct = async (req, res, next) => {
  try {
    const newOrderedProduct = await OrderedProducts.create({ ...req.body });
    res.status(200).send(newOrderedProduct);
  } catch (err) {
    next(err);
  }
};

const updateOrderedProduct = async (req, res, next) => {
  try {
    const updateOrderedProduct = await OrderedProducts.update(
      { ...req.body },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    res.send(updateOrderedProduct);
  } catch (err) {
    next(err);
  }
};

const deleteOrderedProduct = async (req, res, next) => {
  try {
    const deleteOrderedProduct = await OrderedProducts.destroy({
      where: { id: req.query.id },
    });
    if (deleteOrderedProduct === 1) {
      res.status(200).send("Ordered Product Deleted.");
    }
    res.status(400).send("Ordered Product Id not found.");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getOrderedProducts,
  createNewOrderedProduct,
  updateOrderedProduct,
  deleteOrderedProduct,
};
