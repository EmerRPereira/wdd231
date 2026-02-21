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

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name.en}" loading="lazy">
      <h3>${product.name.en}</h3>
      <p>${product.desc.en}</p>
      <p><strong>R$ ${product.price.toFixed(2)}</strong></p>
      <button class="details-btn">View Details</button>
    `;

    // Modal interaction
    card.querySelector(".details-btn").addEventListener("click", () => {
      document.querySelector("#modal-title").textContent = product.name.en;
      document.querySelector("#modal-description").textContent = product.desc.en;
      document.querySelector("#product-modal").style.display = "block";
    });

    container.appendChild(card);
  });

  // Close modal
  document.querySelector(".close-modal").addEventListener("click", () => {
    document.querySelector("#product-modal").style.display = "none";
  });
}

document.addEventListener("DOMContentLoaded", loadProducts);

