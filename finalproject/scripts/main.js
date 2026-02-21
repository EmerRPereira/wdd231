/*****************************************************
 * scripts/main.js
 * WDD231 – Final Project
 * Author: Emerson Ronald Pereira
 * Main Application Entry Point (FINAL VERSION)
 *****************************************************/

import { initWeather } from "./weather.js";
import "./navigation.js";

/* Initialize Weather only if container exists */
if (document.querySelector("#weather-card")) {
  initWeather();
}

/* Footer Dynamic Year */
const year = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

/* Load Featured Product */
async function loadFeaturedProduct() {
  const container = document.querySelector("#featured-product");
  if (!container) return;

  try {
    const response = await fetch("./data/products.json");

    if (!response.ok) {
      throw new Error("Failed to fetch products.json");
    }

    const products = await response.json();

    if (!Array.isArray(products) || products.length === 0) {
      container.textContent = "No featured product available.";
      return;
    }

    const randomIndex = Math.floor(Math.random() * products.length);
    const product = products.at(randomIndex);

    container.innerHTML = `
      <h3>Featured Product</h3>
      <img src="${product.image}" 
           alt="${product.name.en}" 
           loading="lazy">
      <h4>${product.name.en}</h4>
      <p>${product.desc.en}</p>
      <p><strong>R$ ${product.price.toFixed(2)}</strong></p>
    `;

  } catch (error) {
    console.error("Error loading featured product:", error);
  }
}

/* Initialize */
loadFeaturedProduct();



/* Initialize */
loadFeaturedProduct();

