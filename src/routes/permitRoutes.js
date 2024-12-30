const express = require('express');
const {
  issuePermit,
  updatePermit,
  getPermits,
  deactivatePermit,
  getPermitById,
} = require('../controllers/permitController');
const protect = require('../middlewares/authMiddleware');
const verifyAdminRole = require('../middlewares/roleMiddleware');

const router = express.Router();

// Protect all permit-related routes
router.post('/', protect, verifyAdminRole, issuePermit);
router.put('/:id', protect, verifyAdminRole, updatePermit); // `id` refers to `permitNumber` here
router.get('/', protect, verifyAdminRole, getPermits);
router.delete('/:id', protect, verifyAdminRole, deactivatePermit);
router.get('/:id', protect, verifyAdminRole, getPermitById);


module.exports = router;