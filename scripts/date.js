// Get current year for copyright
const currentYear = new Date().getFullYear();
document.getElementById('currentYear').textContent = currentYear;

// Get last modified date
document.getElementById('lastModified').textContent += document.lastModified;
