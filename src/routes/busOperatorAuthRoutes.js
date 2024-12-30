const express = require('express');
const { operatorLogin, getOperatorProfile } = require('../controllers/busOperatorAuthController');
const operatorProtect = require('../middlewares/operatorAuthMiddleware');

const router = express.Router();

// Bus Operator Login (Public)
router.post('/login', operatorLogin);

// Bus Operator Profile (Protected)
router.get('/profile', operatorProtect, getOperatorProfile);


module.exports = router;
