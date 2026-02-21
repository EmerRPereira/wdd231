/*****************************************************
 * scripts/order.js
 * WDD231 – Final Project
 * Order Page Logic (FINAL VERSION - FIXED)
 * Author: Emerson Ronald Pereira
 *****************************************************/

import { getFromStorage, saveToStorage } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {

  const nameInput = document.querySelector("#customer-name");
  const emailInput = document.querySelector("#customer-email");
  const select = document.querySelector("#product-select");
  const quantityInput = document.querySelector("#quantity");
  const addBtn = document.querySelector("#add-to-cart");
  const cartContainer = document.querySelector("#cart-items");
  const totalEl = document.querySelector("#cart-total");
  const checkoutBtn = document.querySelector("#checkout-btn");
  const toppingsContainer = document.querySelector("#toppings-container");
  const clearBtn = document.querySelector("#clear-cart");

  let products = [];
  let cart = getFromStorage("cart") || [];

  const toppings = [
    { id: "granulado", name: "Granulado", price: 2 },
    { id: "calda", name: "Calda Chocolate", price: 3 },
    { id: "morango", name: "Morangos", price: 4 }
  ];

  /* ===== RENDER TOPPINGS ===== */
  function renderToppings() {
    toppingsContainer.innerHTML = "";
    toppings.forEach(t => {
      const label = document.createElement("label");
      label.innerHTML = `
        <input type="checkbox" value="${t.id}">
        ${t.name} (+ R$ ${t.price.toFixed(2)})
      `;
      toppingsContainer.appendChild(label);
    });
  }

  /* ===== LOAD PRODUCTS ===== */
  async function loadProducts() {
    try {
      const basePath = window.location.hostname.includes("github.io")
      ? "/wdd231/finalproject/"
      : "";

      const response = await fetch(`${basePath}data/products.json`);
      const data = await response.json();
      products = data.products;

      products.forEach(product => {
        const option = document.createElement("option");
        option.value = product.id;
        option.textContent = `${product.name.en} — R$ ${product.price.toFixed(2)}`;
        select.appendChild(option);
      });

    } catch (error) {
      console.error("Error loading products:", error);
    }
  }

  /* ===== RENDER CART ===== */
  function renderCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.total;

      const div = document.createElement("div");
      div.classList.add("cart-item");

      div.innerHTML = `
        <strong>${item.name}</strong>
        <p>${item.toppings.length ? item.toppings.join(", ") : "No toppings"}</p>
        <p>Qty: ${item.quantity}</p>
        <p>R$ ${item.total.toFixed(2)}</p>
        <button data-index="${index}" class="remove-btn">Remove</button>
      `;

      cartContainer.appendChild(div);
    });

    totalEl.textContent = total.toFixed(2);
    saveToStorage("cart", cart);
  }

  /* ===== ADD TO CART ===== */
  addBtn.addEventListener("click", () => {

    const productId = select.value;
    const qty = Number(quantityInput.value);

    if (!productId || qty < 1) return;

    const product = products.find(p => String(p.id) === String(productId));
    if (!product) return;

    const checked = toppingsContainer.querySelectorAll("input:checked");

    let selectedToppings = [];
    let toppingPrice = 0;

    checked.forEach(input => {
      const topping = toppings.find(t => t.id === input.value);
      if (topping) {
        selectedToppings.push(topping.name);
        toppingPrice += topping.price;
      }
    });

    const totalPrice = (product.price + toppingPrice) * qty;

    cart.push({
      name: product.name.en,
      quantity: qty,
      toppings: selectedToppings,
      total: totalPrice
    });

    renderCart();
  });

  /* ===== REMOVE ITEM ===== */
  cartContainer.addEventListener("click", e => {
    if (e.target.classList.contains("remove-btn")) {
      const index = Number(e.target.dataset.index);
      cart.splice(index, 1);
      renderCart();
    }
  });

  /* ===== CLEAR CART ===== */
  clearBtn.addEventListener("click", () => {
    cart = [];
    renderCart();
  });

  /* ===== CHECKOUT ===== */
  checkoutBtn.addEventListener("click", () => {

    if (!cart.length) {
      alert("Cart is empty.");
      return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !email) {
      alert("Please fill in name and email.");
      return;
    }

    const total = cart.reduce((sum, item) => sum + item.total, 0);

    const order = {
      id: Date.now(),
      customer: { name, email },
      items: [...cart],
      total,
      date: new Date().toISOString()
    };

    const orders = getFromStorage("dachsice_orders") || [];
    orders.push(order);
    saveToStorage("dachsice_orders", orders);

    saveToStorage("cart", []);
    window.location.href = "thankyou.html";
  });

  renderToppings();
  loadProducts();
  renderCart();

});

