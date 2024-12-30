const Admin = require('../models/AdminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



exports.addAdmin = async (req, res) => {
  const { username, password, role } = req.body;


  // Validation to ensure all fields are provided
  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }


  try {
    // Check if the Admin username already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new admin
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
      role, // e.g., 'admin' or 'super-admin'
    });

    // Save to database
    await newAdmin.save();

    res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};



//Admin Login
exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });

    console.log('Admin found:', admin); // Debugging

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials password' });

    res.json({ token: generateToken(admin.id, admin.role) });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error' });
  }

};





// Get Admin Profile
exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select('-password');
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

