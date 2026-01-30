/******************************************************
 * scripts/directory.js
 * WDD231 – Chamber Directory Page
 * Member Directory with Grid/List Toggle
 * Author: Emerson Ronald Pereira
 ******************************************************/

const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

const dataURL = "data/members.json";

async function getMembers() {
  try {
    const response = await fetch(dataURL);
    if (!response.ok) throw new Error("Directory JSON not found");

    const data = await response.json();
    displayMembers(data.members);

  } catch (error) {
    console.error("Directory error:", error);
    membersContainer.innerHTML = "<p>Unable to load directory data.</p>";
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Website</a>
    `;

    membersContainer.appendChild(card);
  });
}

gridButton.addEventListener("click", () => {
  membersContainer.classList.add("grid");
  membersContainer.classList.remove("list");
});

listButton.addEventListener("click", () => {
  membersContainer.classList.add("list");
  membersContainer.classList.remove("grid");
});

getMembers();
