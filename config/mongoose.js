const mongoose = require('mongoose');

// MongoDB connection URL
const url = 'mongodb+srv://dhwanishah9927:scI30CqjOXht3HKb@cluster0.hhsgtmw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(url);

// Get the default connection
const database = mongoose.connection;

// Event listener for connection error
database.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

// Event listener once the connection is open
database.once('open', () => {
    console.log("Connected to Database :: MongoDB ");
});

module.exports = database;
