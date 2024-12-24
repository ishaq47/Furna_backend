const express = require('express');
const router = express.Router();

const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');
const { login, register, dashboard, initialRegister } = require('../controllers/adminController');


router.post('/login', login);
router.post('/register', authMiddleware, adminMiddleware, register);
router.get('/dashboard', authMiddleware, adminMiddleware, dashboard);
router.post('/initial-register', initialRegister); // Temporary route for initial admin registration

module.exports = router;
