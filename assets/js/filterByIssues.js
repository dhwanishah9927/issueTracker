// Obtain the form
let issueFilterForm = document.getElementById('formforfilterissue');

// Retrieve the project's issue specifics in JSON format
let issuesJsonElement = document.getElementById('issueDetails');
// Retrieve the value of the "details" attribute from the HTML element with the ID "issueDetails" 
// and assign it to the variable "issuesJson".
let issuesJson = issuesJsonElement.getAttribute('details');

// Parse the details
let issues = JSON.parse(issuesJson);
// Retrieve the element where filtered issues will be displayed.

let filterIssueRecord = document.getElementById('issuesRecord');


issueFilterForm.addEventListener('submit', event => {
  event.preventDefault();

  // Retrieve form details
  const formData = new FormData(issueFilterForm);
  const checkedLabels = formData.getAll('labels');
  const authorValue = formData.get('author');

  // Filter issues based on form details
  const filteredIssues = issues.filter(issue => {
      const hasMatchingAuthor = !authorValue || issue.author === authorValue;
      const hasMatchingLabels = checkedLabels.some(label => issue.labels.includes(label));
      return hasMatchingAuthor && hasMatchingLabels;
  });

  // Generate HTML for filtered issues
  const filteredIssuesHTML = filteredIssues.map(issue => `
      <div class="card w-100">
          <div class="card-body">
              <h4 class="card-title">Title: ${issue.title}</h4>
              <h6 class="card-subtitle mb-2 text-muted">Description: ${issue.description}</h6>
              <h6 class="card-subtitle mb-2 text-muted">Author: ${issue.author}</h6>
          </div>
      </div>
  `).join('');

  // Update issue list with filtered issues HTML
  filterIssueRecord.innerHTML = filteredIssuesHTML;
});