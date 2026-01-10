const courses = [
   { code: "CSE110", name: "Programming Building Blocks", credits: 3, completed: true },
    { code: "CSE111", name: "Programming with Functions", credits: 3, completed: true },
    { code: "CSE210", name: "Programming with Classes", credits: 2, completed: true },
    { code: "WDD130", name: "Web Fundamentals", credits: 2, completed: true },
    { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 2, completed: true },
    { code: "WDD231", name: "Frontend Web Development I", credits: 2, completed: false },
    // Add other courses as per your certificate
];

const courseContainer = document.getElementById("courses");
const totalCredits = document.getElementById("totalCredits");
const buttons = document.querySelectorAll("#course-filters button");

function displayCourses(courseList) {
  courseContainer.innerHTML = "";

  const credits = courseList.reduce((sum, course) => sum + course.credits, 0);
  totalCredits.textContent = credits;

  if (courseList.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "No courses found for this filter.";
    emptyMsg.style.textAlign = "center";
    emptyMsg.style.padding = "2rem";
    emptyMsg.style.color = "#666";
    courseContainer.appendChild(emptyMsg);
    return;
  }

  courseList.forEach(course => {
    const div = document.createElement("div");
    div.classList.add("course");

    if (course.completed) {
      div.classList.add("completed");
    }

    div.innerHTML = `
      <h3>${course.code} – ${course.name}</h3>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p class="status">${course.completed ? '✓ Completed' : 'In Progress'}</p>
    `;
    
    courseContainer.appendChild(div);
  });
}

// Adicionar classe active ao botão clicado
buttons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove active de todos os botões
    buttons.forEach(btn => btn.classList.remove("active"));
    
    // Adiciona active ao botão clicado
    button.classList.add("active");
    
    const filter = button.dataset.filter;

    if (filter === "all") {
      displayCourses(courses);
    } else {
      displayCourses(
        courses.filter(course =>
          course.code.toLowerCase().startsWith(filter))
      );
    }
  });
});

// Inicializar com todos os cursos e botão "All" ativo
document.addEventListener("DOMContentLoaded", () => {
  displayCourses(courses);
  buttons[0].classList.add("active"); // Primeiro botão (All)
});
