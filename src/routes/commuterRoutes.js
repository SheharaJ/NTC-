const express = require('express');
const router = express.Router();
const {
  searchBuses,
  getSeats,
  bookSeatWithPayment,
  cancelBooking,
  searchAvailableBuses,
} = require('../controllers/commuterController');

// Search for buses
router.get('/bus', searchBuses);

// Get seats for a bus
router.get('/check-seats', getSeats);

router.get('/search-available-buses', searchAvailableBuses);

// Book a seat with payment
router.post('/book-and-pay', bookSeatWithPayment);

// Cancel a booking
router.post('/cancel-booking', cancelBooking);

module.exports = router;