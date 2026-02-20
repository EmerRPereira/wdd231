/*****************************************************
 * scripts/thankyou.js
 * WDD231 – Thank You Page Cart Integration
 * Author: Emerson Ronald Pereira
 * Location: Curitiba, Brazil
 *****************************************************/

import { getFromStorage, saveToStorage } from "./storage.js";

const summaryContainer = document.querySelector("#order-summary");
const historyContainer = document.querySelector("#history-list");
const grandTotalEl = document.querySelector("#grand-total");
const clearBtn = document.querySelector("#clear-orders");

const orders = getFromStorage("dachsice_orders") || [];

const params = new URLSearchParams(window.location.search);

const name = params.get("name");
const email = params.get("email");
const total = params.get("total");

document.querySelector("#order-summary").innerHTML = `
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Total:</strong> R$ ${total}</p>
`;

/* ===== LAST ORDER ===== */
function displayLastOrder() {
  if (!orders.length) {
    summaryContainer.innerHTML = "<p>No recent orders.</p>";
    return;
  }

  const last = orders[orders.length - 1];

  const customerName = last.customer?.name || "Not provided";
  const customerEmail = last.customer?.email || "Not provided";

  summaryContainer.innerHTML = `
    <p><strong>Order ID:</strong> ${last.id}</p>
    <p><strong>Customer:</strong> ${customerName}</p>
    <p><strong>Email:</strong> ${customerEmail}</p>

    <div class="order-table">
      <div class="table-header">
        <span>Product</span>
        <span>Qty</span>
        <span>Toppings</span>
        <span>Total</span>
      </div>

      ${last.items.map(item => `
        <div class="table-row">
          <span>${item.name}</span>
          <span>${item.quantity}</span>
          <span>${item.toppings.join(", ")}</span>
          <span>R$ ${item.total.toFixed(2)}</span>
        </div>
      `).join("")}
    </div>

    <h3 class="order-total">
      Order Total: R$ ${last.total.toFixed(2)}
    </h3>
  `;
}

/* ===== ORDER HISTORY (TABLE FORMAT) ===== */
function displayHistory() {

  if (!orders.length) {
    historyContainer.innerHTML = "<p>No order history.</p>";
    grandTotalEl.textContent = "0.00";
    return;
  }

  let totalRevenue = 0;

  historyContainer.innerHTML = `
    <div class="order-table">
      <div class="table-header">
        <span>Order ID</span>
        <span>Customer</span>
        <span>Email</span>
        <span>Date</span>
        <span>Total</span>
      </div>

      ${orders.map(order => {

        totalRevenue += order.total;

        const formattedDate = new Date(order.date).toLocaleDateString("en-CA");

        return `
          <div class="table-row history-row">
            <span>${order.id}</span>
            <span>${order.customer?.name || "N/A"}</span>
            <span>${order.customer?.email || "N/A"}</span>
            <span>${formattedDate}</span>
            <span>R$ ${order.total.toFixed(2)}</span>
          </div>
        `;
      }).join("")}
    </div>
  `;

  grandTotalEl.textContent = totalRevenue.toFixed(2);
}


/* ===== CLEAR HISTORY ===== */
clearBtn.addEventListener("click", () => {
  saveToStorage("dachsice_orders", []);
  location.reload();
});

/* ===== INIT ===== */
displayLastOrder();
displayHistory();
