const { OrderedProducts, Products } = require("../models");

const getOrderedProducts = async (req, res, next) => {
  try {
    if (Object.keys(req.query).length === 0) {
      orderedProducts = await OrderedProducts.findAll();
    } else {
      const [[key, value]] = Object.entries(req.query);
      switch (key) {
        case "productId": {
          orderedProducts = await OrderedProducts.findAll({
            where: { ProductId: value },
          });
          break;
        }
        case "orderId": {
          orderedProducts = await OrderedProducts.findAll({
            where: { OrderId: value },
          });
          break;
        }
        default: {
          orderedProducts = await OrderedProducts.findAll();
        }
      }
    }

    res.send(orderedProducts);
  } catch (err) {
    next(err);
  }
};

const getProductDetails = async (req, res, next) => {
  try {
    const orderedProduct = await OrderedProducts.findOne(
      { include: Products },
      {
        where: { id: req.query.id },
      }
    );
    res.status(200).send(orderedProduct);
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
  getProductDetails,
  createNewOrderedProduct,
  updateOrderedProduct,
  deleteOrderedProduct,
};
