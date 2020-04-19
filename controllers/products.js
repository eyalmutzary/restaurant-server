const { Products } = require("../models");

// Get all products or by category or by id
const getProducts = async (req, res, next) => {
  try {
    if (Object.keys(req.query).length === 0) {
      products = await Products.findAll();
    } else {
      const [[key, value]] = Object.entries(req.query);
      switch (key) {
        case "categoryId": {
          products = await Products.findAll({ where: { CategoryId: value } });
          break;
        }
        case "id": {
          products = await Products.findOne({ where: { id: value } });
          break;
        }
        default: {
          products = await Products.findAll();
        }
      }
    }

    res.send(products);
  } catch (err) {
    next(err);
  }
};

// Create new Product
const createNewProduct = async (req, res, next) => {
  try {
    const newProduct = await Products.create({ ...req.body });
    res.status(200).send(newProduct);
  } catch (err) {
    next(err);
  }
};

// Update Product
const updateProduct = async (req, res, next) => {
  try {
    const updateProduct = await Products.update(
      { ...req.body },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    res.send(updateProduct);
  } catch (err) {
    next(err);
  }
};

// Delete Product by query param - id
const deleteProduct = async (req, res, next) => {
  try {
    const deleteProduct = await Products.destroy({
      where: { id: req.query.id },
    });
    if (deleteProduct === 1) {
      res.status(200).send("Product Deleted.");
    }
    res.status(400).send("Product Id not found.");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
};
