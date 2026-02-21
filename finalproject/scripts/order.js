/*****************************************************
 * scripts/order.js
 * WDD231 – Final Project
 * Order Page Logic (FINAL VERSION - FIXED)
 * Author: Emerson Ronald Pereira
 *****************************************************/

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
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const toppings = [
  { id: "granulado", name: "Granulado", price: 2 },
  { id: "calda", name: "Calda Chocolate", price: 3 },
  { id: "morango", name: "Morangos", price: 4 }
];

/* ===== RENDER TOPPINGS ===== */
function renderToppings() {
  toppings.forEach(t => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="checkbox" value="${t.id}" data-price="${t.price}">
      ${t.name} (+ R$ ${t.price.toFixed(2)})
    `;
    toppingsContainer.appendChild(label);
  });
}
renderToppings();

/* ===== LOAD PRODUCTS ===== */
async function loadProducts() {
  try {
  const response = await fetch("https://emerrpereira.github.io/wdd231/finalproject/data/products.json");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const products = await response.json();

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
loadProducts();

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
  localStorage.setItem("cart", JSON.stringify(cart));
}
renderCart();

/* ===== ADD TO CART ===== */
addBtn.addEventListener("click", () => {
  const productId = select.value;
  const qty = Number(quantityInput.value);

  if (!productId || qty < 1) return;

  const product = products.find(p => p.id === productId);
  if (!product) return;

  const checked = toppingsContainer.querySelectorAll("input:checked");

  let selectedToppings = [];
  let toppingPrice = 0;

  checked.forEach(input => {
    const topping = toppings.find(t => t.id === input.value);
    selectedToppings.push(topping.name);
    toppingPrice += topping.price;
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
  if (!cart.length) return;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !email) {
    alert("Please fill in name and email.");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.total, 0);

  const order = {
    id: Date.now(),
    customer: {
      name,
      email
    },
    items: cart,
    total,
    date: new Date().toISOString()
  };

  let orders = JSON.parse(localStorage.getItem("dachsice_orders")) || [];
  orders.push(order);

  localStorage.setItem("dachsice_orders", JSON.stringify(orders));
  localStorage.removeItem("cart");

  window.location.href = "thankyou.html";
});


