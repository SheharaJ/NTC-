const express = require('express');
const {
  createRoute,
  getRoutes,
  updateRoute,
  deleteRoute
} = require('../controllers/routeController');
const protect = require('../middlewares/authMiddleware'); // Ensure this line is present
const verifyAdminRole = require('../middlewares/roleMiddleware'); // Ensure this line is present

const router = express.Router();

// Create a Route
router.post('/', protect, verifyAdminRole, createRoute);

// Get All Routes or Filter by Criteria
router.get('/', protect, verifyAdminRole, getRoutes);

// Update a Route
router.put('/:id', protect, verifyAdminRole, updateRoute);

// Delete a Route by routeId
router.delete('/:id', protect, verifyAdminRole, deleteRoute);

module.exports = router;