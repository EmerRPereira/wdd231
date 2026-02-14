/*****************************************************
 * scripts/main.js
 * WDD231 – Final Project
 * Main Application Entry Point
 * Author: Emerson Ronald Pereira
 * Location: Curitiba, Brazil
 *****************************************************/

import { initWeather } from "./weather.js";
import "./navigation.js";

initWeather();

const year = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = "Last Modified: " + document.lastModified;
}

async function loadFeaturedProduct() {
  try {
    const response = await fetch("data/products.json");
    const products = await response.json();

    const randomIndex = Math.floor(Math.random() * products.length);
    const product = products[randomIndex];

    const container = document.querySelector("#featured-product");

    container.innerHTML = `
      <h3>Featured Product</h3>
      <img src="${product.image}" alt="${product.name.en}">
      <h4>${product.name.en}</h4>
      <p>${product.desc.en}</p>
      <p><strong>R$ ${product.price.toFixed(2)}</strong></p>
    `;
  } catch (error) {
    console.error("Error loading featured product:", error);
  }
}

loadFeaturedProduct();
