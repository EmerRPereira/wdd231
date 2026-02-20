/*****************************************************
 * scripts/products.js
 * WDD231 – Final Project
 * Products Management
 * Author: Emerson Ronald Pereira
 * Location: Curitiba, Brazil
 *****************************************************/

import { saveToStorage } from "./storage.js";

const grid = document.querySelector("#product-grid");
const modal = document.getElementById("product-modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const closeModal = document.querySelector(".close-modal");

/* Product Extra Details */
const productDetails = {
  "Classic Cone": "Available flavors: Vanilla, Chocolate, Mixed. Cone or cup option. Add toppings for +R$2.",
  "300ml Top Sundae (2 flavors)": "Choose 2 flavors. Includes syrup topping. Optional whipped cream.",
  "Chocolate Milkshake": "Creamy chocolate milkshake. Sizes: 300ml or 500ml. Optional extra chocolate drizzle."
};

/* Load Products from JSON */
async function loadProducts() {
  if (!grid) return;

  try {
    const response = await fetch("./data/products.json");

    if (!response.ok) {
      throw new Error("Failed to fetch products.json");
    }

    const products = await response.json();

    grid.innerHTML = "";

    products.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${product.image}" 
             alt="${product.name.en}" 
             loading="lazy"
             onerror="this.src='images/placeholder.webp'">
        <h3>${product.name.en}</h3>
        <p>${product.desc.en}</p>
        <p class="price">R$ ${product.price.toFixed(2)}</p>
        <button aria-label="View details of ${product.name.en}">
          Details
        </button>
      `;

      grid.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading products:", error);
    if (grid) {
      grid.textContent = "Unable to load products.";
    }
  }
}

/* Event Delegation for Modal */
if (grid && modal) {
  grid.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {

      const card = e.target.closest(".card");
      if (!card) return;

      const productName = card.querySelector("h3").textContent;

      modalTitle.textContent = productName;
      modalDescription.textContent =
        productDetails[productName] || "More details coming soon!";

      modal.classList.add("active");
    }
  });
}

/* Close Modal */
if (closeModal && modal) {
  closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
  });
}

window.addEventListener("click", (e) => {
  if (modal && e.target === modal) {
    modal.classList.remove("active");
  }
});

/* Initialize */
loadProducts();
