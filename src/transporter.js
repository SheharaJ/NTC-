require('dotenv').config();
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Use your email provider's SMTP host
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'sheharajaya7@gmail.com', // Replace with your email
    pass: 'xuvt oguv wnqf vpir', // Replace with your password or app-specific password
  },
});

module.exports = transporter;