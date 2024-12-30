// Import required modules
import express from 'express'; // Framework for building web applications
import mongoose from 'mongoose'; // Library for connecting to MongoDB database
import dotenv from 'dotenv'; // Module for managing environment variables

import userRouter from './routes/user.route.js'; // Router for user-related endpoints
import authRouter from './routes/auth.route.js'; // Router for authentication-related endpoints
import listingRouter from './routes/listing.route.js'; // Router for listing-related endpoints
import reviewRouter from './routes/review.route.js'; // Router for review-related endpoints

import cookieParser from 'cookie-parser'; // Middleware to parse cookies
import path from 'path'; // Node.js module to handle file paths

// Load environment variables from a .env file into process.env
dotenv.config();

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGO) // Connect using the connection string stored in the .env file
  .then(() => {
    console.log('Connected to MongoDB!'); // Log success message on successful connection
  })
  .catch((err) => {
    console.log(err); // Log error if connection fails
  });

// Get the directory name of the current module (for path operations)
const __dirname = path.resolve();

// Initialize the Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse cookies in incoming requests
app.use(cookieParser());

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000!'); // Log message when the server starts
});

// Route middleware for handling user-related API endpoints
app.use('/api/user', userRouter);

// Route middleware for handling authentication-related API endpoints
app.use('/api/auth', authRouter);

// Route middleware for handling listing-related API endpoints
app.use('/api/listing', listingRouter);

// Route middleware for handling review-related API endpoints
app.use('/api/review', reviewRouter);

// Serve static files from the client/dist directory
app.use(express.static(path.join(__dirname, '/client/dist')));

// Fallback route to serve the frontend (React app) for non-API requests
app.get('*', (req, res) => {
  // Serve the main HTML file for routes not handled by the above middleware
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Error-handling middleware II not to code multiple time
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Default to 500 if no specific status code is set
  const message = err.message || 'Internal Server Error'; // Default to a generic error message
  return res.status(statusCode).json({
    success: false, // Indicate the request failed
    statusCode, // Return the status code
    message, // Return the error message
  });
});


//temp