/*****************************************************
 * scripts/spotlights.js
 * WDD231 – Chamber Home Page
 * Member Spotlights
 * Author: Emerson Ronald Pereira
 *****************************************************/

const spotlightContainer = document.querySelector(".spotlights");
const dataURL = "data/members.json";

async function loadSpotlights() {
  try {
    const response = await fetch(dataURL);
    const data = await response.json();

    // Gold (3) e Silver (2)
    const qualified = data.members.filter(
      member => member.membership === 3 || member.membership === 2
    );

    // Embaralhar aleatoriamente
    const shuffled = qualified.sort(() => 0.5 - Math.random());

    // Selecionar 2 ou 3
    const count = Math.floor(Math.random() * 2) + 2;
    const selected = shuffled.slice(0, count);

    displaySpotlights(selected);

  } catch (error) {
    console.error("Error loading spotlights:", error);
  }
}

function displaySpotlights(members) {
  spotlightContainer.innerHTML = "<h2>Member Spotlights</h2>";

  members.forEach(member => {
    const level =
      member.membership === 3 ? "Gold" :
      member.membership === 2 ? "Silver" :
      "Member";

    const card = document.createElement("div");
    card.classList.add("spotlight");

    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <p><strong>Membership:</strong> ${level}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
    `;

    spotlightContainer.appendChild(card);
  });
}

loadSpotlights();
