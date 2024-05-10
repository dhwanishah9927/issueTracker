// Importing necessary modules
const express = require('express'); // Import Express framework
const database = require('./config/mongoose'); // Import database configuration
const path = require('path'); // Import path module

// Setting up port
const port = process.env.PORT || 8200; // Use environment port or default to 8200
const server = express(); // Create Express server instance

// Importing express-ejs-layouts for layout support
const ejsLayouts = require('express-ejs-layouts');

// Setting up EJS for templating
server.set('layout extractStyles', true); // Extract styles defined in layout
server.set('layout extractScripts', true); // Extract scripts defined in layout
server.set('view engine', 'ejs'); // Set view engine to EJS
server.set('views', './views'); // Set views directory

server.use(express.urlencoded()); // Parse URL-encoded bodies
server.use(express.static('assets')); // Serve static files from 'assets' directory
server.use(ejsLayouts); // Use express-ejs-layouts middleware for layout support

// Routing setup
server.use('/', require('./routes')); // Use routes defined in './routes' directory

// Start server
server.listen(port, (error) => {
  if (error) {
    console.log(`Error in running the server: ${error}`); // Log error if server fails to start
  } else {
    console.log(`Server is running on port: ${port}`); // Log successful server start
  }
});
