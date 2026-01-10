// Course data array (modify completed status as needed)
const courses = [
    { code: "CSE110", name: "Programming Building Blocks", credits: 3, completed: false },
    { code: "CSE111", name: "Programming with Functions", credits: 3, completed: false },
    { code: "CSE210", name: "Programming with Classes", credits: 2, completed: false },
    { code: "WDD130", name: "Web Fundamentals", credits: 2, completed: false },
    { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 2, completed: false },
    { code: "WDD231", name: "Frontend Web Development I", credits: 2, completed: false },
    // Add other courses as per your certificate
];

// DOM elements
const courseDisplay = document.getElementById('courseDisplay');
const creditTotal = document.getElementById('totalCredits');
const allButton = document.getElementById('all');
const wddButton = document.getElementById('wdd');
const cseButton = document.getElementById('cse');

// Display courses function
function displayCourses(filter = 'all') {
    let filteredCourses = [];
    
    switch(filter) {
        case 'wdd':
            filteredCourses = courses.filter(course => course.code.startsWith('WDD'));
            break;
        case 'cse':
            filteredCourses = courses.filter(course => course.code.startsWith('CSE'));
            break;
        default:
            filteredCourses = courses;
    }
    
    // Clear previous display
    courseDisplay.innerHTML = '';
    
    // Calculate total credits
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    creditTotal.textContent = totalCredits;
    
    // Create and append course cards
    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = `course-card ${course.completed ? 'completed' : ''}`;
        
        courseCard.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.name}</p>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p>${course.completed ? '✓ Completed' : 'In Progress'}</p>
        `;
        
        courseDisplay.appendChild(courseCard);
    });
}

// Event listeners for filter buttons
allButton.addEventListener('click', () => displayCourses('all'));
wddButton.addEventListener('click', () => displayCourses('wdd'));
cseButton.addEventListener('click', () => displayCourses('cse'));

// Initialize with all courses
document.addEventListener('DOMContentLoaded', () => {
    displayCourses('all');
});
