/*****************************************************
 * scripts/products.js
 * WDD231 – Final Project
 * Products Management
 * Author: Emerson Ronald Pereira
 * Location: Curitiba, Brazil
 *****************************************************/

import { saveToStorage } from "./storage.js";

const grid = document.querySelector("#product-grid");

async function loadProducts() {
  try {
    const response = await fetch("data/products.json");
    const products = await response.json();

    grid.innerHTML = "";

    products.forEach(product => {
      grid.innerHTML += `
        <div class="card">
          <img src="${product.image}" alt="${product.name.en}" loading="lazy">
          <h3>${product.name.en}</h3>
          <p>${product.category}</p>
          <p>${product.desc.en}</p>
          <p class="price">R$ ${product.price.toFixed(2)}</p>
          <button data-id="${product.id}">Details</button>
        </div>
      `;
    });

  } catch (error) {
    console.error("Error loading products:", error);
  }
}

const modal = document.getElementById("product-modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const closeModal = document.querySelector(".close-modal");

const productDetails = {
  "Classic Cone": "Available flavors: Vanilla, Chocolate, Mixed. Cone or cup option. Add toppings for +R$2.",
  "300ml Top Sundae (2 flavors)": "Choose 2 flavors. Includes syrup topping. Optional whipped cream.",
  "Chocolate Milkshake": "Creamy chocolate milkshake. Sizes: 300ml or 500ml. Optional extra chocolate drizzle."
};

/* EVENT DELEGATION */
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

closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

loadProducts();
