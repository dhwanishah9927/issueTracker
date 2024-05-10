const Issue = require('../models/issue');
const Project = require('../models/project');





// Controller function for creating a project
const createProject = async  (req, res) => {
  try {
    // Destructure the request body to extract required properties
    const { name, description, author } = req.body;

    // Create a new project with the extracted properties
    await Project.create({
      name,
      description,
      author,
    });

    // Redirect back to the previous page after project creation
    return res.redirect('back');
  } catch (error) {
    // Log any errors that occur during project creation
    console.error('Error creating project:', error);
    // Redirect back to the previous page in case of error
    return res.redirect('back');
  }
};

module.exports.createProject = createProject;




// find project and display it in the project page
const projectPage = async (req, res) => {
  try {
    // Find project by ID and populate its 'issues' field
    const projectPage = await Project.findById(req.params.id).populate({
      path: 'issues', // Populate the 'issues' field of the project
    });

    // Check if project is found
    if (projectPage) {
      // Render the project page with the retrieved project data
      return res.render('projectdetailsPage', {
        title: 'Project Page', // Set the title of the page
        project: projectPage, // Pass the project data to the view
      });
    }

    // Redirect back if project is not found
    return res.redirect('back');
  } 
  catch (error) {
    // Log error and redirect back in case of error
    console.error('Error finding project or rendering page:', error);
    return res.redirect('back');
  }
};

module.exports.projectPage = projectPage;




// Define the controller function for creating an issue
const createIssueButton = async (req, res) => {
  try {
    // Find the project by ID
    const projectPage = await Project.findById(req.params.id);
    
    // If project is not found, redirect back
    if (!projectPage) {
      return res.redirect('back');
    }

    // Create a new issue
    const issue = new Issue({
      title: req.body.title, // Set the title of the issue from the request body
      description: req.body.description, // Set the description of the issue from the request body
      labels: Array.isArray(req.body.labels) ? req.body.labels : [req.body.labels], // Set the labels of the issue from the request body, handling both array and single value
      author: req.body.author, // Set the author of the issue from the request body
    });

    // Save the new issue
    await issue.save();

    // Add the new issue to the project's issues array
    projectPage.issues.push(issue);

    // Add unique labels to the project
    if (Array.isArray(req.body.labels)) {
      req.body.labels.forEach(label => {
        // Check if the label is not already present in the project's labels array
        if (!projectPage.labels.includes(label)) {
          // If not present, add the label to the project's labels array
          projectPage.labels.push(label);
        }
      });
    } else if (!projectPage.labels.includes(req.body.labels)) {
      // If label is not already present in project's labels array
      // Add the label to the project's labels array
      projectPage.labels.push(req.body.labels);
    }

    // Save the project with the new issue and labels
    await projectPage.save();

    // Redirect back to the previous page
    return res.redirect('back');
  } catch (error) {
    // Log any errors that occur during issue creation
    console.error('Error creating issue:', error);
    // Redirect back to the previous page in case of error
    return res.redirect('back');
  }
};

// Export the controller function
module.exports.createIssueButton = createIssueButton;
