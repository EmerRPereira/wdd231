/*****************************************************
 * scripts/navigation.js
 * WDD231 – Final Project
 * Navigation Toggle
 * Author: Emerson Ronald Pereira
 * Location: Curitiba, Brazil
 *****************************************************/

const button = document.querySelector("#menu-button");
const nav = document.querySelector("#navigation");

button.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  button.setAttribute("aria-expanded", isOpen);
});

// Fecha ao clicar em link
nav.addEventListener("click", () => {
  nav.classList.remove("open");
  button.setAttribute("aria-expanded", false);
});
