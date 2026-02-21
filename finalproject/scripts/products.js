/*****************************************************
 * scripts/products.js
 * WDD231 – Final Project
 * Products Management
 * Author: Emerson Ronald Pereira
 * Location: Curitiba, Brazil
 *****************************************************/

const container = document.querySelector("#product-grid");

async function loadProducts() {
  if (!container) return;

  try {
    const response = await fetch("data/products.json");

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    const products = data.products;


    if (!Array.isArray(products) || products.length === 0) {
      container.innerHTML = "<p>No products available.</p>";
      return;
    }

    displayProducts(products);

  } catch (error) {
    console.error("Error loading products:", error);
    container.innerHTML = "<p>Unable to load products.</p>";
  }
}

function displayProducts(products) {
  container.innerHTML = "";

  const modal = document.querySelector("#product-modal");
  const modalTitle = document.querySelector("#modal-title");
  const modalDescription = document.querySelector("#modal-description");
  const closeBtn = document.querySelector(".close-modal");

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name.en}" loading="lazy">
      <h3>${product.name.en}</h3>
      <p>${product.desc.en}</p>
      <p class="price"><strong>R$ ${product.price.toFixed(2)}</strong></p>
      <button class="details-btn">View Details</button>
    `;

    card.querySelector(".details-btn").addEventListener("click", () => {
      modalTitle.textContent = product.name.en;
      modalDescription.textContent = product.desc.en;
      modal.classList.add("active");
    });

    container.appendChild(card);
  });

  // Close button
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // Close clicking outside modal-content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
}


document.addEventListener("DOMContentLoaded", loadProducts);

