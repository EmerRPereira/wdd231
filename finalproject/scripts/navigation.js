/*****************************************************
 * scripts/navigation.js
 * WDD231 – Final Project
 * Navigation Toggle
 * Author: Emerson Ronald Pereira
 * Location: Curitiba, Brazil
 *****************************************************/

const button = document.querySelector("#menu-button");
const nav = document.querySelector("#navigation");

/* SAFETY CHECK (avoids JS errors on other pages) */
if (button && nav) {

  /* INITIAL STATE */
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", "navigation");

  button.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    /* ARIA must be string */
    button.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  /* CLOSE MENU ONLY WHEN CLICKING LINKS */
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      nav.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
    }
  });
}
