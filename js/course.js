const courses = [
  { code: "WDD130", name: "Web Fundamentals", credits: 3, completed: true },
  { code: "WDD231", name: "Frontend Development I", credits: 3, completed: false },
  { code: "CSE110", name: "Programming Building Blocks", credits: 2, completed: true },
  { code: "CSE111", name: "Programming with Functions", credits: 2, completed: false }
];

const courseContainer = document.getElementById("courses");
const totalCredits = document.getElementById("totalCredits");
const buttons = document.querySelectorAll("#course-filters button");

function displayCourses(courseList) {
  courseContainer.innerHTML = "";

  const credits = courseList.reduce((sum, course) => sum + course.credits, 0);
  totalCredits.textContent = credits;

  courseList.forEach(course => {
    const div = document.createElement("div");
    div.classList.add("course");

    if (course.completed) {
      div.classList.add("completed");
    }

    div.textContent = `${course.code} – ${course.name} (${course.credits})`;
    courseContainer.appendChild(div);
  });
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
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

displayCourses(courses);
