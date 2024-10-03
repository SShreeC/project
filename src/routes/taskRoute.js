

const express = require('express');
const { addTask, getTasks, addSubject, getSubjects ,updateTaskProgress,updateTaskScheduledDate} = require('../controllers/taskController');
const { authenticateToken } = require('../utils/jwtUtils');
const router = express.Router();

router.post('/add', authenticateToken, addTask);
router.get('/myTasks', authenticateToken, getTasks);
router.post('/subjects', authenticateToken, addSubject); // Route to add a subject
router.get('/getSub', authenticateToken, getSubjects); // Route to get subjects
//  router.get('/schedule', authenticateToken, scheduleTasks);
router.put('/updateProgress/:taskId',authenticateToken,updateTaskProgress);
router.put('/updateScheduledDate/:taskId', authenticateToken, updateTaskScheduledDate);

module.exports = router;
