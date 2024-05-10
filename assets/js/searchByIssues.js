// Obtain the form
const IssueSearchFormElement = document.getElementById('formforsearchissue');
// Retrieve the project's issue details in JSON format.
const searchDataElement = document.getElementById('issueDetails');
const searchData = searchDataElement.getAttribute('details');
// Parse the data
const parseSerachIssues = JSON.parse(searchData);
// Retrieve the element where the searched items will be displayed.
const searchRecordElement = document.getElementById('issuesRecord');





// This function handles form submission, filters the issues based on form input, and renders the filtered issues
IssueSearchFormElement.addEventListener('submit', function (event) 
{
  event.preventDefault();

// Initialize an array to store the search results
const recordOfSearchedIssues = [];

// Retrieve form details
const formData = new FormData(IssueSearchFormElement);
const formDataTitle = formData.get('titletitle');
const formDataDescription = formData.get('descripdescrip');



 // Filter the parseSerachIssues array to include only the issues that match the conditions
parseSerachIssues.filter(issue => {
  // Check if the issue's title matches the formDataTitle or the issue's description matches the formDataDescription
  return issue.title === formDataTitle || issue.description === formDataDescription;
}).forEach(issue => {
  // For each filtered issue, push it into the recordOfSearchedIssues array
  recordOfSearchedIssues.push(issue);
});



// Clear the inner HTML content of the searchRecordElement
searchRecordElement.innerHTML = '';

// Iterate through each searched issue and append them to the search record element
recordOfSearchedIssues.forEach(issue => 
{
  // Create a new div element
  const divElement = document.createElement('div');
  // Set the class name of the div element to 'card w-100'
  divElement.className = 'card w-100';

  // Set the inner HTML of the div element
  divElement.innerHTML = `
    <div class="card-body">
      <h4 class="card-title">Title: ${issue.title}</h4>
      <h6 class="card-subtitle mb-2 text-muted">Description: ${issue.description}</h6>
      <h6 class="card-subtitle mb-2 text-muted">Author: ${issue.author}</h6>
    </div>
  `;

  // Append the div element to the search record element
  searchRecordElement.appendChild(divElement);
});

});
