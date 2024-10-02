// // controllers/endTimeController.js
// const EndTime = require('../models/endTime');
// const { authenticateToken } = require('../utils/jwtUtils');

// // Function to add end times for the authenticated user
// const addEndTimes = async (req, res) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const { endTimes } = req.body; // Get endTimes from the request body

//     // Validate that all days are provided
//     const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
//     for (const day of daysOfWeek) {
//       if (!endTimes[day]) {
//         return res.status(400).json({ message: `End time for ${day} is required.` });
//       }
//     }

//     // Check if end times already exist for the user
//     let userEndTimes = await EndTime.findOne({ user: req.user.id });

//     if (userEndTimes) {
//       // If they exist, update them
//       userEndTimes.endTimes = endTimes;
//       await userEndTimes.save();
//     } else {
//       // If they don't exist, create a new entry
//       userEndTimes = new EndTime({
//         user: req.user.id,
//         endTimes,
//       });
//       await userEndTimes.save();
//     }

//     res.status(201).json({ message: "End times added/updated successfully", endTimes: userEndTimes.endTimes });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error adding/updating end times", error });
//   }
// };

// // Function to get end times for the authenticated user
// const getEndTimes = async (req, res) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     // Fetch the end times for the authenticated user
//     const userEndTimes = await EndTime.findOne({ user: req.user.id });

//     if (!userEndTimes) {
//       return res.status(404).json({ message: "End times not found." });
//     }

//     res.status(200).json({ message: "End times retrieved successfully", endTimes: userEndTimes.endTimes });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error retrieving end times", error });
//   }
// };

// module.exports = {
//   addEndTimes,
//   getEndTimes,
// };
const EndTime = require('../models/endTime');
const { authenticateToken } = require('../utils/jwtUtils');

// Function to add end times for the authenticated user
const addEndTimes = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { endTimes } = req.body; // Get endTimes from the request body

    // Validate that all days are provided
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    for (const day of daysOfWeek) {
      if (!endTimes[day]) {
        return res.status(400).json({ message: `End time for ${day} is required.` });
      }
    }

    // Check if end times already exist for the user
    let userEndTimes = await EndTime.findOne({ user: req.user.id });

    if (userEndTimes) {
      return res.status(409).json({ message: 'End times already exist for this user.' });
    } else {
      // If they don't exist, create a new entry
      userEndTimes = new EndTime({
        user: req.user.id,
        endTimes,
      });
      await userEndTimes.save();
    }

    res.status(201).json({ message: "End times added successfully", endTimes: userEndTimes.endTimes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding end times", error });
  }
};

// Function to get end times for the authenticated user
const getEndTimes = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch the end times for the authenticated user
    const userEndTimes = await EndTime.findOne({ user: req.user.id });

    if (!userEndTimes) {
      return res.status(404).json({ message: "End times not found." });
    }

    res.status(200).json({ message: "End times retrieved successfully", endTimes: userEndTimes.endTimes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving end times", error });
  }
};

module.exports = {
  addEndTimes,
  getEndTimes,
};
