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
async function loadProducts() {
  try {
    const response = await fetch("./data/products.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.products || !Array.isArray(data.products)) {
      throw new Error("products array not found in JSON");
    }

    products = data.products;

    products.forEach(product => {
      const option = document.createElement("option");
      option.value = product.id;
      option.textContent = `${product.name.en} — R$ ${product.price.toFixed(2)}`;
      select.appendChild(option);
    });

  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  }
}


/* Initialize */
loadFeaturedProduct();

