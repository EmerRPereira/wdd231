/*****************************************************
 * scripts/thankyou.js
 * WDD231 – Thank You Page Cart Integration
 * Author: Emerson Ronald Pereira
 * Location: Curitiba, Brazil
 *****************************************************/

import { getFromStorage, saveToStorage } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {

  const summaryContainer = document.querySelector("#order-summary");
  const historyContainer = document.querySelector("#history-list");
  const grandTotalEl = document.querySelector("#grand-total");
  const clearBtn = document.querySelector("#clear-orders");

  const orders = getFromStorage("dachsice_orders") || [];

  /* ===== LAST ORDER ===== */
  function displayLastOrder() {

    if (!summaryContainer) return;

    if (!orders.length) {
      summaryContainer.innerHTML = "<p>No recent order found.</p>";
      return;
    }

    const last = orders.at(-1);

    summaryContainer.innerHTML = `
      <p><strong>Order ID:</strong> ${last.id}</p>
      <p><strong>Customer:</strong> ${last.customer.name}</p>
      <p><strong>Email:</strong> ${last.customer.email}</p>
      <p><strong>Total:</strong> R$ ${last.total.toFixed(2)}</p>
    `;
  }

  /* ===== HISTORY ===== */
  function displayHistory() {

    if (!historyContainer) return;

    if (!orders.length) {
      historyContainer.innerHTML = "<p>No order history.</p>";
      return;
    }

    let totalRevenue = 0;

    historyContainer.innerHTML = orders.map(order => {
      totalRevenue += order.total;
      return `
        <div class="history-row">
          <p><strong>ID:</strong> ${order.id}</p>
          <p>${order.customer.name} — ${order.customer.email}</p>
          <p>Date: ${new Date(order.date).toLocaleDateString()}</p>
          <p>Total: R$ ${order.total.toFixed(2)}</p>
          <hr>
        </div>
      `;
    }).join("");

    if (grandTotalEl) {
      grandTotalEl.textContent = totalRevenue.toFixed(2);
    }
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      saveToStorage("dachsice_orders", []);
      location.reload();
    });
  }

  displayLastOrder();
  displayHistory();

});

