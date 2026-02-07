document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("discoverGrid");
  const messageBox = document.getElementById("visit-message");

  const modal = document.getElementById("discoverModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const closeModal = document.getElementById("closeModal");

  if (!grid) return;

  /* ---------- VISIT MESSAGE ---------- */
  if (messageBox) {
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (!lastVisit) {
      messageBox.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const diffDays = Math.floor((now - lastVisit) / 86400000);
      messageBox.textContent =
        diffDays < 1
          ? "Back so soon! Awesome!"
          : `You last visited ${diffDays} ${diffDays === 1 ? "day" : "days"} ago.`;
    }

    localStorage.setItem("lastVisit", now);
  }

  /* ---------- LOAD JSON ---------- */
  const response = await fetch("data/discover.json");
  const data = await response.json();

  data.discoverItems.forEach((item, index) => {
    const card = document.createElement("article");
    card.classList.add("discover-card");
    card.style.gridArea = `card${index + 1}`;

    const button = document.createElement("button");
    button.textContent = "Learn More";

    button.addEventListener("click", () => {
      modalTitle.textContent = item.title;
      modalDescription.textContent = item.description;
      modal.showModal();
    });

    card.innerHTML = `
      <h2>${item.title}</h2>
      <figure>
        <img src="${item.image}" alt="${item.title}" loading="lazy">
      </figure>
      <address>${item.address}</address>
    `;

    card.appendChild(button);
    grid.appendChild(card);
  });

  closeModal.addEventListener("click", () => modal.close());
});
