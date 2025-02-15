const express = require('express');
const auth = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', auth.registerUser);
router.post('/login', auth.loginUser);
router.put('/profile', verifyToken, auth.updateUserProfile);
router.post('/child', verifyToken, auth.addChildProfile);
router.get("/children", verifyToken, auth.getChildProfiles);

module.exports = router;