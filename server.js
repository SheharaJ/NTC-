require('dotenv').config();
require('./src/config/emailSetUp'); 
const express = require('express');
const connectDB = require('./src/config/db'); // Ensure this path and function are correct
const cors = require('cors');
const rateLimiter = require('./src/middlewares/rateLimiter');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('./swaggerOptions'); // Importing SwaggerOptions.js


const adminRoutes = require('./src/routes/adminRoutes'); // Adjust path if needed
const busRoutes = require('./src/routes/busRoutes'); // Adjust path if needed
const busOperatorRoutes = require('./src/routes/BusOperatorRoutes');
const commuterRoutes = require('./src/routes/commuterRoutes'); // Updated path
const routeRoutes = require('./src/routes/routeRoutes');
const scheduleRoutes = require('./src/routes/scheduleRoutes');
const permitRoutes = require('./src/routes/permitRoutes');
const busOperatorAuthRoutes = require('./src/routes/busOperatorAuthRoutes');
const busOperatorActionsRoutes = require('./src/routes/busOperatorActionRoutes.js'); // For operator-specific actions

const errorHandler = require('./src/middlewares/errorHandler');

const app = express();

// Middleware
app.use(express.json()); // For parsing JSON bodies
app.use(cors());
app.use(rateLimiter);

// Connect to the Database
connectDB(); // Ensure this function connects to MongoDB correctly



// Routes
app.use('/ntc/admin', adminRoutes); // Admin-related routes

app.use('/ntc/admin/bus', busRoutes); // For bus management
app.use('/ntc/admin/busOperators', busOperatorRoutes); // Bus operator-related routes
app.use('/ntc/commuters', commuterRoutes); // Commuter-related routes
app.use('/ntc/admin/routes', routeRoutes); // For routes management
app.use('/ntc/admin/schedules', scheduleRoutes); // For schedules management
app.use('/ntc/admin/permits', permitRoutes); // Permit routes
app.use('/ntc/bus-operators/authentication', busOperatorAuthRoutes);
app.use('/ntc/bus-operators/action/', busOperatorActionsRoutes); // Operator-specific actions
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));


// Error Handling Middleware
app.use(errorHandler);




// Start the server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
