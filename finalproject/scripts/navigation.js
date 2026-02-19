/*****************************************************
 * scripts/navigation.js
 * WDD231 – Final Project
 * Navigation Toggle
 * Author: Emerson Ronald Pereira
 * Location: Curitiba, Brazil
 *****************************************************/

const button = document.querySelector("#menu-button");
const nav = document.querySelector("#navigation");

if (button && nav) {
  button.addEventListener("click", () => {
    nav.classList.toggle("open");

    const isOpen = nav.classList.contains("open");
    button.setAttribute("aria-expanded", isOpen);
  });
}
