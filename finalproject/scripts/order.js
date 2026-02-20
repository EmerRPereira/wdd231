/*****************************************************
 * scripts/order.js
 * WDD231 – Final Project
 * Order Page Logic
 *****************************************************/

import { saveToStorage, getFromStorage } from "./storage.js";

const name = document.querySelector("#customer-name").value;
const email = document.querySelector("#customer-email").value;
const select = document.querySelector("#product-select");
const quantityInput = document.querySelector("#quantity");
const addBtn = document.querySelector("#add-to-cart");
const cartContainer = document.querySelector("#cart-items");
const totalEl = document.querySelector("#cart-total");
const checkoutBtn = document.querySelector("#checkout-btn");
const toppingsContainer = document.querySelector("#toppings-container");
const clearBtn = document.querySelector("#clear-cart");

let products = [];
let cart = getFromStorage("dachsice_cart") || [];

/* ===== COMPLEMENTOS ===== */
const toppings = [
  { id: "granulado", name: "Granulado", price: 2 },
  { id: "calda", name: "Calda Chocolate", price: 3 },
  { id: "morango", name: "Morangos", price: 4 }
];

/* RENDER TOPPINGS CHECKBOXES */
function renderToppings() {
  toppings.forEach(topping => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="checkbox" value="${topping.id}" data-price="${topping.price}">
      ${topping.name} (+ R$ ${topping.price.toFixed(2)})
    `;
    toppingsContainer.appendChild(label);
  });
}

renderToppings();


/* LOAD PRODUCTS */
async function loadProducts() {
  const response = await fetch("data/products.json");
  products = await response.json();

  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = `${product.name.en} — R$ ${product.price.toFixed(2)}`;
    select.appendChild(option);
  });
}

loadProducts();

/* RENDER CART */
function renderCart() {
  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.total;

    cartContainer.innerHTML += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong>
          <p>${item.toppings.join(", ") || "No toppings"}</p>
          <div class="qty-controls">
            <button data-index="${index}" class="minus">-</button>
            <span>${item.quantity}</span>
            <button data-index="${index}" class="plus">+</button>
          </div>
        </div>
        <div>
          R$ ${item.total.toFixed(2)}
          <button data-index="${index}" class="remove-btn">🗑</button>
        </div>
      </div>
    `;
  });

  totalEl.textContent = total.toFixed(2);
  saveToStorage("dachsice_cart", cart);
}

renderCart();

/* ADD TO CART */
addBtn.addEventListener("click", () => {
  const productId = select.value;
  const qty = Number(quantityInput.value);

  if (!productId || qty < 1) return;

  const product = products.find(p => p.id === productId);

  // pegar apenas os toppings selecionados
  const checked = toppingsContainer.querySelectorAll("input:checked");

  let selectedToppings = [];
  let toppingPrice = 0;

  checked.forEach(input => {
    const topping = toppings.find(t => t.id === input.value);
    selectedToppings.push(topping.name);
    toppingPrice += topping.price;
  });

  const unitPrice = product.price + toppingPrice;

  cart.push({
    id: product.id,
    name: product.name.en,
    quantity: qty,
    toppings: selectedToppings,
    unitPrice: unitPrice,
    total: unitPrice * qty
  });

  renderCart();

  // limpar seleções
  checked.forEach(input => input.checked = false);
});


/* CART CONTROLS */
cartContainer.addEventListener("click", (e) => {
  const index = e.target.dataset.index;
  if (e.target.classList.contains("plus")) {
    cart[index].quantity++;
    cart[index].total = cart[index].unitPrice * cart[index].quantity;
  }

  if (e.target.classList.contains("minus") && cart[index].quantity > 1) {
    cart[index].quantity--;
    cart[index].total = cart[index].unitPrice * cart[index].quantity;
  }

    if (e.target.classList.contains("remove-btn")) {
      cart.splice(index, 1);
    }
  renderCart();
});

/* CLEAR */
clearBtn.addEventListener("click", () => {
  cart = [];
  renderCart();
});

/* CHECKOUT */
checkoutBtn.addEventListener("click", () => {

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name) {
    alert("Please enter your name.");
    return;
  }

  if (!email || !email.includes("@")) {
    alert("Please enter a valid email.");
    return;
  }

  if (!cart.length) {
    alert("Cart empty!");
    return;
  }

  const order = {
    id: "ord_" + Date.now(),
    customer: {
      name,
      email
    },
    items: cart,
    total: cart.reduce((sum, item) => sum + item.total, 0),
    date: new Date().toISOString()
  };

  const orders = getFromStorage("dachsice_orders") || [];
  orders.push(order);

  saveToStorage("dachsice_orders", orders);
  saveToStorage("dachsice_cart", []);

  window.location.href = `thankyou.html?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&total=${total}`;
});
