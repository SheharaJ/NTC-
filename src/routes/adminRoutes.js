const express = require('express');
const Admin = require('../models/AdminModel');
const verifyToken = require('../middlewares/authMiddleware');
const verifyAdminRole = require('../middlewares/roleMiddleware');
const { adminLogin, getAdminProfile, addAdmin } = require('../controllers/adminController');
const jwt = require('jsonwebtoken');
const router = express.Router();




router.post('/create', addAdmin);






// Admin login route (public)
router.post('/login', adminLogin);
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide both username and password' });
      }
      
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isPasswordValid = await admin.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }


    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }

}

);





// Admin profile route (protected)
router.get('/profile', verifyToken, verifyAdminRole, getAdminProfile);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin Management
 */


/**
 * @swagger
 * /ntc/admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin_unique_001
 *               password:
 *                 type: string
 *                 example: StrongPassword123
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /ntc/admin/profile:
 *   get:
 *     summary: Get admin profile
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin profile retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
