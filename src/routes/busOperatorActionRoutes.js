const express = require('express');
const {
  getSchedulesForOperator,
  getSeatBookingsForOperator,
  reassignBusInSchedule,
} = require('../controllers/busOperatorActionsController');
const operatorProtect = require('../middlewares/operatorAuthMiddleware');

const router = express.Router();

// Route to view schedules for operator's buses
router.get('/schedules', operatorProtect, getSchedulesForOperator);

// Route to view seat bookings for operator's buses
router.get('/bookings', operatorProtect, getSeatBookingsForOperator);

// Route to reassign a bus
router.put('/reassign-bus', operatorProtect, reassignBusInSchedule);


module.exports = router;
