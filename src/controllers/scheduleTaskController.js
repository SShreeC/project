// controllers/taskController.js
const Task = require('../models/taskModel');
const moment = require('moment');

// Fetch tasks for the logged-in user
exports.getTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

// Add a new task
exports.addTask = async (req, res) => {
  try {
    const { subject, taskType, priority, dueDate } = req.body;
    const userId = req.user._id;

    const newTask = new Task({
      userId,
      subject,
      taskType,
      priority,
      dueDate,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error adding task', error });
  }
};

// Schedule tasks based on end time
exports.scheduleTasks = async (req, res) => {
  try {
    const { endTime } = req.body;
    const userId = req.user._id;

    const tasks = await Task.find({ userId, scheduledTime: null }).sort({ dueDate: 1 });

    let startTime = moment().set({ hour: endTime.split(':')[0], minute: endTime.split(':')[1], second: 0 });

    for (const task of tasks) {
      if (moment(task.dueDate).subtract(1, 'day').isSameOrAfter(moment())) {
        startTime = startTime.add(2, 'hours'); // Start scheduling 2 hours after end time
        task.scheduledTime = startTime.toDate();
        startTime = startTime.add(1.5, 'hours'); // 1.5 hours of work
        startTime = startTime.add(25, 'minutes'); // 25 mins break
        await task.save();
      }
    }

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error scheduling tasks', error });
  }
};
