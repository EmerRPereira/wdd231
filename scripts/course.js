// scripts/course.js
const courses = [
    { code: "CSE110", name: "Programming Building Blocks", credits: 3, completed: true },
    { code: "CSE111", name: "Programming with Functions", credits: 3, completed: true },
    { code: "CSE210", name: "Programming with Classes", credits: 2, completed: true },
    { code: "WDD130", name: "Web Fundamentals", credits: 2, completed: true },
    { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 2, completed: true },
    { code: "WDD231", name: "Frontend Web Development", credits: 2, completed: false },
];

const courseContainer = document.getElementById("courses");
const totalCreditsElement = document.getElementById("totalCredits");
const buttons = document.querySelectorAll("#course-filters button");

// Função para calcular créditos usando reduce()
function calculateTotalCredits(courseList) {
    return courseList.reduce((accumulator, course) => {
        return accumulator + course.credits;
    }, 0);
}

// Função para calcular créditos completados usando reduce()
function calculateCompletedCredits(courseList) {
    return courseList.reduce((accumulator, course) => {
        return course.completed ? accumulator + course.credits : accumulator;
    }, 0);
}

function displayCourses(courseList) {
    courseContainer.innerHTML = "";

    // Usar reduce() para calcular créditos totais
    const totalCredits = calculateTotalCredits(courseList);
    const completedCredits = calculateCompletedCredits(courseList);
    
    totalCreditsElement.textContent = totalCredits;
    
    // Atualizar subtítulo com mais informações
    const creditsSubtitle = document.querySelector('.credits-subtitle');
    creditsSubtitle.textContent = `Completed: ${completedCredits} | In Progress: ${totalCredits - completedCredits} | Calculated using reduce()`;

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
            <p class="status">${course.completed ? '✓ Completed' : '○ In Progress'}</p>
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
        } else if (filter === "wdd") {
            const wddCourses = courses.filter(course => 
                course.code.toLowerCase().startsWith("wdd")
            );
            displayCourses(wddCourses);
        } else if (filter === "cse") {
            const cseCourses = courses.filter(course => 
                course.code.toLowerCase().startsWith("cse")
            );
            displayCourses(cseCourses);
        }
    });
});

// Inicializar com todos os cursos e botão "All" ativo
document.addEventListener("DOMContentLoaded", () => {
    displayCourses(courses);
    buttons[0].classList.add("active"); // Primeiro botão (All)
});
