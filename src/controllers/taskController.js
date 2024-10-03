
const Task = require('../models/task');
const Subject = require('../models/subject'); // Import the Subject model
const { authenticateToken } = require('../utils/jwtUtils');


const addTask = async (req, res) => {
  try {
    // Ensure user information is available in req.user
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Destructure the fields from the request body
    const { subject, taskType, priority, dueDate, progress, description, scheduledStartDate } = req.body;
    const userId = req.user.id; 

    // Create a new task with the provided fields, while allowing optional fields to be omitted
    const newTask = new Task({
      subject,
      taskType,
      priority,
      dueDate,
      progress: progress || 0, // Defaults to 0 if not provided
      description: description || '', // Defaults to an empty string if not provided
      scheduledStartDate: scheduledStartDate || null, // Can be left empty if not provided
      user: userId
    });

    await newTask.save();
    res.status(201).json({ message: "Task added successfully", task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding task", error });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

// Function to add a subject
const addSubject = async (req, res) => {
  try {
    // Ensure you have user information in req.user
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { subject } = req.body;
    const userId = req.user.id; 

    // Check if the subject already exists for this user
    const existingSubject = await Subject.findOne({ subject, user: userId });
    if (existingSubject) {
      return res.status(409).json({ message: "Subject already exists" });
    }

    const newSubject = new Subject({
      subject,
      user: userId // Assign the user ID from the token
    });

    await newSubject.save();
    res.status(201).json({ message: "Subject added successfully", subject: newSubject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding subject", error });
  }
};

// New function to get all subjects for a user
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ user: req.user.id }); // Fetch subjects for the authenticated user
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subjects', error });
  }
};

// // Function to schedule tasks
// const scheduleTasks = async (req, res) => {
//   try {
//     // Fetching tasks that are not completed
//     const tasks = await Task.find({ user: req.user.id, completed: false }).sort({ dueDate: 1 });

//     // Extracting user end time from request body
//     const userEndTime = req.body.endTime; // Expecting "18:00" format
//     const [hours, minutes] = userEndTime.split(':');
//     let scheduleStartTime = new Date();
//     scheduleStartTime.setHours(parseInt(hours) + 2, parseInt(minutes), 0, 0); // 2 hours after user end time

//     // Array to hold scheduled tasks
//     const scheduledTasks = [];

//     for (let task of tasks) {
//       const taskEndTime = new Date(scheduleStartTime);
//       taskEndTime.setMinutes(taskEndTime.getMinutes() + 90); // 1.5 hours work

//       // Push the scheduled task with its details
//       scheduledTasks.push({
//         taskId: task._id,
//         scheduledStartTime: scheduleStartTime,
//         scheduledEndTime: taskEndTime,
//       });

//       // Prepare for next task scheduling
//       scheduleStartTime = new Date(taskEndTime);
//       scheduleStartTime.setMinutes(scheduleStartTime.getMinutes() + 25); // 25 minutes break
//     }

//     // Update scheduled times back to the database
//     const updatePromises = scheduledTasks.map(scheduledTask => {
//       return Task.updateOne(
//         { _id: scheduledTask.taskId },
//         {
//           scheduledStartTime: scheduledTask.scheduledStartTime,
//           scheduledEndTime: scheduledTask.scheduledEndTime,
//         }
//       );
//     });

//     // Await all updates to complete
//     await Promise.all(updatePromises);

//     res.json({ message: "Tasks scheduled successfully", scheduledTasks });
//   } catch (error) {
//     res.status(500).json({ message: "Error scheduling tasks", error });
//   }
// };

// Update Task Function
const updateTaskProgress = async (req, res) => {
  const { taskId } = req.params; // Get the task ID from the request parameters
  const { title, description, status,progress,scheduledStartDate} = req.body; // Get updated fields from the request body

  try {
    // Find the task by ID and check if it belongs to the authenticated user
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: req.user.id }, // Ensure the task belongs to the user
      { title, description, status ,progress,scheduledStartDate},
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found or not authorized to update' });
    }

    res.status(200).json(updatedTask); // Return the updated task
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating task', error });
  }
};

const updateTaskScheduledDate = async (req, res) => {
  const { taskId } = req.params; // Get the task ID from the request parameters
  const { scheduledStartTime } = req.body; // Get the updated scheduled start time from the request body

  try {
    // Find the task by ID and check if it belongs to the authenticated user
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: req.user.id }, // Ensure the task belongs to the user
      { scheduledStartTime }, // Update the scheduled start time
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found or not authorized to update' });
    }

    res.status(200).json(updatedTask); // Return the updated task
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating scheduled date', error });
  }
};


module.exports = {
  addTask,
  getTasks,
  addSubject,
  getSubjects,
  updateTaskProgress,updateTaskScheduledDate,// Export the new scheduleTasks function
};
