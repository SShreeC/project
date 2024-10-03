// routes/endTimeRoutes.js
const express = require('express');
const router = express.Router();
const { addEndTimes, getEndTimes } = require('../controllers/endTimeController');
const { authenticateToken } = require('../utils/jwtUtils');

// Route for adding/updating end times
router.post('/addEndTime', authenticateToken, addEndTimes);

// Route for getting end times
router.get('/getEndTime', authenticateToken, getEndTimes);

module.exports = router;
