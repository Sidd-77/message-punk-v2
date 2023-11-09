const express = require('express');
const router = express.Router();
const { registerUser, authUser, allUsers } = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');

// /api/user/


router.route('/').post(registerUser).get(protect, allUsers);
router.route('/login').post(authUser);

module.exports = router;