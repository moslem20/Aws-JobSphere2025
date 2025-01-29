// Utility functions for the JobSphere AI project

// Function to validate email format
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Function to show alerts
function showAlert(message, type = 'info') {
  const alertBox = document.createElement('div');
  alertBox.className = `alert alert-${type}`;
  alertBox.innerText = message;
  document.body.appendChild(alertBox);
  setTimeout(() => alertBox.remove(), 3000);
}

// Function to toggle visibility of an element
function toggleVisibility(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
      element.style.display = element.style.display === 'none' ? 'block' : 'none';
  }
}

// Export functions for use in other scripts
export { isValidEmail, showAlert, toggleVisibility };