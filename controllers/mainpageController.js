// Import the Project model
const Project = require('../models/project');

// Controller function for rendering the home page
module.exports.home = async function (req, res) {
  try {
    // Retrieve all projects from the database and sort them by createdAt field in descending order
    const projects = await Project.find({}).sort({ createdAt: -1 });
    
    // Render the home page with the retrieved projects and set the title to "Issue Tracker"
    res.render('homepage', {
      // Set the title of the web page to "Issue Tracker"
      title: 'Issue Tracker App',
      // Pass the retrieved projects to the home page template
      projects,
    });
  } catch (err) {
    // If an error occurs, log the error and return
    console.log('Error', err);
    return;
  }
};

