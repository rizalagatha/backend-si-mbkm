// controllers/categoryController.js
const Categories = require('../models/categories');
const ProgramMbkm = require('../models/programMbkm');

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new category
const createCategories = async (req, res) => {
  try {
    const { name } = req.body;
    const categories = await Categories.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a category
const updateCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const categories = await Categories.findByPk(id);
    if (!categories) {
      return res.status(404).json({ message: 'Category not found' });
    }
    categories.name = name;
    await categories.save();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a category
const deleteCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const categories = await Categories.findByPk(id);
    if (!categories) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await categories.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllCategories, createCategories, updateCategories, deleteCategories };
