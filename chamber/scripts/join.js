/*****************************************************
 * scripts/join.js
 * WDD231 – Chamber Join Page
 * Membership Application Form Script
 * Author: Emerson Ronald Pereira
 *****************************************************/

document.addEventListener("DOMContentLoaded", () => {
  const timestamp = document.getElementById("timestamp");
  if (timestamp) {
    timestamp.value = new Date().toISOString();
  }

  const modalButtons = document.querySelectorAll("[data-modal]");
  const closeButtons = document.querySelectorAll(".close-modal");

  modalButtons.forEach(button => {
    button.addEventListener("click", () => {
      const modalId = button.dataset.modal;
      document.getElementById(modalId).showModal();
    });
  });

  closeButtons.forEach(button => {
    button.addEventListener("click", () => {
      button.closest("dialog").close();
    });
  });
});
