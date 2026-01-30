/*****************************************************
 * scripts/menu.js
 * WDD231 – Chamber Website
 * Mobile Menu Toggle
 * Author: Emerson Ronald Pereira
 *****************************************************/

const menuButton = document.querySelector("#menu");
const nav = document.querySelector("nav");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuButton.classList.toggle("open");
});
