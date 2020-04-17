const { Categories } = require("../models");

// Get all Categories
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Categories.findAll();
    res.send(categories);
  } catch (err) {
    next(err);
  }
};

// Create new Category
const createNewCategories = async (req, res, next) => {
  try {
    const newCategory = await Categories.create({ ...req.body });
    res.send(newCategory);
  } catch (err) {
    next(err);
  }
};

// Update Categories name
const updateCategoryName = async (req, res, next) => {
  try {
    const updateCategory = await Categories.update(
      { name: req.body.name },
      {
        where: {
          id: req.query.id,
        },
      }
    );
    res.send(updateCategory);
  } catch (err) {
    next(err);
  }
};

// Delete Categories by query param - id
const deleteCategory = async (req, res, next) => {
  try {
    const deleteCategory = await Categories.destroy({
      where: { id: req.query.id },
    });
    if (deleteCategory === 1) {
      res.status(200).send("Category Deleted.");
    }
    res.status(200).send("Category Id not found.");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCategories,
  createNewCategories,
  updateCategoryName,
  deleteCategory,
};
