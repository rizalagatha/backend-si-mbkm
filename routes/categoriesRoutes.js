// routes/categoryRoutes.js
const express = require('express');
const { getAllCategories, createCategories, updateCategories, deleteCategories } = require('../controllers/categoriesController');
const router = express.Router();

router.get('/categories', getAllCategories);        // Get all categories
router.post('/categories', createCategories);         // Create a new category
router.put('/categories/:id', updateCategories);      // Update a category
router.delete('/categories/:id', deleteCategories);   // Delete a category

module.exports = router;
