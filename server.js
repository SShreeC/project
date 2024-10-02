const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const loginRoute = require("./src/routes/login");
const signupRoute = require("./src/routes/signup");
const taskRoute =require("./src/routes/taskRoute");
 const endTimeRoutes=require("./src/routes/endTimeRoute");
const app = express();
// const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT || 5000; // Change port number here
const mongoose=require('./src/configuration/dbConfig');
app.use(bodyParser.json());
app.use(cors());

// Define routesr
app.use("/user", signupRoute);
app.use("/auth", loginRoute);
app.use('/end', endTimeRoutes); 
app.use('/task',taskRoute);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
// const loginRoute = require("./src/routes/login");
// const signupRoute = require("./src/routes/signup");
// const taskRoute = require('./src/routes/taskRoute'); // Import task routes
// const { verifyToken } = require('./src/utils/authMiddleware'); // Import authentication middleware

// dotenv.config(); // Load environment variables

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Public Routes
// app.use("/user", signupRoute);
// app.use("/auth", loginRoute);

// // Protected Routes with Authentication
// app.use('/api', verifyToken, taskRoute); // Use token verification middleware for task routes

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send({ error: 'Something went wrong!' });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
