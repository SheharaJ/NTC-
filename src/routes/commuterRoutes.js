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
router.get('/searchBus', searchBuses);

// Get seats for a bus
router.get('/get-seats', getSeats);

router.get('/find-present-buses', searchAvailableBuses);

// Book a seat with payment
router.post('/book-and-pay', bookSeatWithPayment);

// Cancel a booking
router.post('/cancel-booking', cancelBooking);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Commuter
 *   description: Commuter operations
 */

/**
 * @swagger
 * /ntc/commuters/find-present-buses:
 *   get:
 *     summary: Search for available buses
 *     tags: [Commuter]
 *     parameters:
 *       - in: query
 *         name: boardingPlace
 *         schema:
 *           type: string
 *         required: true
 *         description: Boarding place
 *       - in: query
 *         name: destinationPlace
 *         schema:
 *           type: string
 *         required: true
 *         description: Destination place
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Travel date
 *     responses:
 *       200:
 *         description: List of available buses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 buses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       scheduleId:
 *                         type: string
 *                       routeId:
 *                         type: string
 *                       busNumber:
 *                         type: string
 *                       type:
 *                         type: string
 *                       capacity:
 *                         type: integer
 *                       boardingPlace:
 *                         type: string
 *                       destinationPlace:
 *                         type: string
 *                       price:
 *                         type: integer
 *                       startTime:
 *                         type: string
 *                         format: date-time
 *                       endTime:
 *                         type: string
 *                         format: date-time
 *                       stops:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             stopName:
 *                               type: string
 *                             arrivalTime:
 *                               type: string
 *                               format: date-time
 *       404:
 *         description: No buses found
 */

/**
 * @swagger
 * /ntc/commuters/get-seats:
 *   get:
 *     summary: Get seat availability
 *     tags: [Commuter]
 *     parameters:
 *       - in: query
 *         name: busNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: Bus number
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Travel date
 *     responses:
 *       200:
 *         description: Seat availability
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   seatNumber:
 *                     type: integer
 *                   status:
 *                     type: string
 *                     enum: [Available, Booked]
 */

/**
 * @swagger
 * /ntc/commuters/book-and-pay:
 *   post:
 *     summary: Book a seat with payment
 *     tags: [Commuter]
 *     description: Books a seat for the specified bus and sends a confirmation email with booking details and price to the provided email address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busNumber:
 *                 type: string
 *                 description: Bus number to book a seat on
 *                 example: "CCC-7777"
 *               seatNumber:
 *                 type: integer
 *                 description: Seat number to book
 *                 example: 11
 *               passengerName:
 *                 type: string
 *                 description: Name of the passenger
 *                 example: "Abhishek"
 *               mobileNumber:
 *                 type: string
 *                 description: Passenger's mobile number
 *                 example: "0771234567"
 *               email:
 *                 type: string
 *                 description: Passenger's email address for confirmation
 *                 example: "mudiyansew@gmail.com"
 *               boardingPlace:
 *                 type: string
 *                 description: Boarding place of the passenger
 *                 example: "Colombo"
 *               destinationPlace:
 *                 type: string
 *                 description: Destination place of the passenger
 *                 example: "Kandy"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Date and time of travel
 *                 example: "2025-02-05T08:30:00Z"
 *     responses:
 *       201:
 *         description: Seat booked successfully, and a confirmation email is sent.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Seat booked successfully, confirmation email sent"
 *                 booking:
 *                   type: object
 *                   properties:
 *                     busNumber:
 *                       type: string
 *                       example: "CCC-7777"
 *                     seatNumber:
 *                       type: integer
 *                       example: 11
 *                     passengerName:
 *                       type: string
 *                       example: "Abhishek"
 *                     mobileNumber:
 *                       type: string
 *                       example: "0771234567"
 *                     email:
 *                       type: string
 *                       example: "mudiyansew@gmail.com"
 *                     boardingPlace:
 *                       type: string
 *                       example: "Colombo"
 *                     destinationPlace:
 *                       type: string
 *                       example: "Kandy"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-05T08:30:00Z"
 *                     transactionId:
 *                       type: string
 *                       example: "a9029eebdff54ccd"
 *                     cancellationToken:
 *                       type: string
 *                       example: "98b7af26135114a451a4434182a8b115"
 *                     price:
 *                       type: number
 *                       example: 1200
 *       400:
 *         description: Seat already booked, payment failed, or price not found.
 *       404:
 *         description: Bus or schedule not found for the given details.
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /ntc/commuters/cancel-booking:
 *   post:
 *     summary: Cancel a booking and process a refund
 *     tags: [Commuter]
 *     description: Cancels a booking based on the provided cancellation token and processes a refund.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cancellationToken:
 *                 type: string
 *                 description: Token used to identify and cancel the booking
 *                 example: "98b7af26135114a451a4434182a8b115"
 *     responses:
 *       200:
 *         description: Booking canceled and refund processed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Booking canceled and refund processed"
 *                 refundId:
 *                   type: string
 *                   description: Unique identifier for the processed refund
 *                   example: "ref12345678"
 *       400:
 *         description: Refund failed or invalid cancellation token provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Refund failed"
 *       404:
 *         description: Booking not found for the provided cancellation token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid cancellation token"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error canceling booking"
 *                 error:
 *                   type: string
 *                   example: "Internal server error details"
 */

