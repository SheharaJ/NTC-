const express = require('express');
const {
  addBusOperator,
  updateBusOperator,
  getBusOperators,
  deactivateBusOperator,
  getBusOperatorById,
} = require('../controllers/busOperatorController');
const protect = require('../middlewares/authMiddleware');
const verifyAdminRole = require('../middlewares/roleMiddleware');

const router = express.Router();

// Protect all bus operator-related routes
router.post('/', protect, verifyAdminRole, addBusOperator);
router.put('/:id', protect, verifyAdminRole, updateBusOperator);
router.get('/', protect, verifyAdminRole, getBusOperators);
router.get('/:operatorId', protect, verifyAdminRole, getBusOperatorById);
router.delete('/:id', protect, verifyAdminRole, deactivateBusOperator);

module.exports = router;

