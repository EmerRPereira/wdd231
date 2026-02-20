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
  try {
    const response = await fetch("./data/products.json");
    const products = await response.json();

    const container = document.querySelector("#product-grid");

    products.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name.en}">
        <h3>${product.name.en}</h3>
        <p>${product.desc.en}</p>
        <p class="price">R$ ${product.price.toFixed(2)}</p>
        <button>Details</button>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading products:", error);
  }
}

loadProducts();


/* Event Delegation for Modal */
if (grid) {
  grid.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {

      const card = e.target.closest(".card");
      const productName = card.querySelector("h3").textContent;

      modalTitle.textContent = productName;
      modalDescription.textContent =
        productDetails[productName] || "More details coming soon!";

      modal.classList.add("active");
    }
  });
}

/* Close Modal */
if (closeModal) {
  closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
  });
}

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

/* Initialize */
loadProducts();
