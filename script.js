// Function to load job applications from local storage
function loadApplications() {
  const applications = JSON.parse(localStorage.getItem('jobApplications')) || [];
  const tableBody = document.getElementById('jobTableBody');
  tableBody.innerHTML = '';

  applications.forEach((application, index) => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
          <td>${application.jobTitle}</td>
          <td>${application.company}</td>
          <td>${application.status}</td>
          <td>
              <button class="btn btn-warning btn-sm" onclick="editApplication(${index})">Edit</button>
              <button class="btn btn-danger btn-sm" onclick="deleteApplication(${index})">Delete</button>
          </td>
      `;
      tableBody.appendChild(newRow);
  });

  // Update application count
  document.getElementById('applicationCount').textContent = applications.length;
}

// Function to save job applications to local storage
function saveApplications(applications) {
  localStorage.setItem('jobApplications', JSON.stringify(applications));
}

// Function to initialize the job application tracker
function initializeTracker() {
  loadApplications();
}

// Add event listener to the form
document.getElementById('jobForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const jobTitle = document.getElementById('jobTitle').value;
  const company = document.getElementById('company').value;
  const status = document.getElementById('status').value;

  const applications = JSON.parse(localStorage.getItem('jobApplications')) || [];
  applications.push({ jobTitle, company, status });
  saveApplications(applications);
  document.getElementById('jobForm').reset();
  loadApplications();
});

// Function to edit an application
function editApplication(index) {
  const applications = JSON.parse(localStorage.getItem('jobApplications'));
  const application = applications[index];

  document.getElementById('jobTitle').value = application.jobTitle;
  document.getElementById('company').value = application.company;
  document.getElementById('status').value = application.status;

  // Remove the entry from local storage temporarily
  applications.splice(index, 1);
  saveApplications(applications);
  loadApplications();
}

// Function to delete an application
function deleteApplication(index) {
  const applications = JSON.parse(localStorage.getItem('jobApplications'));
  applications.splice(index, 1);
  saveApplications(applications);
  loadApplications();
}

// Load applications when the page is initialized
initializeTracker();
