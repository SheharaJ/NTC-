const swaggerJsDoc = require('swagger-jsdoc');

// Swagger Options

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'A RESTful API for managing seat reservations and bookings for inter-provincial routes by the National Transport Commission of Sri Lanka. This API includes functionality for admin management, bus operators, commuters, and seat reservation.',
    },
    servers: [
      {
        url: 'http://localhost:5003',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API route documentation
};

// Generate Swagger documentation
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Debug log to verify Swagger documentation output
console.log(swaggerDocs);

// Export the Swagger docs
module.exports = swaggerDocs;
