const menuButton = document.querySelector("#menu");
const nav = document.querySelector("#nav");
const hamburgerIcon = document.querySelector(".hamburger-icon");
const closeIcon = document.querySelector(".close-icon");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
  
  // Alternar ícones
  if (isOpen) {
    hamburgerIcon.style.display = "none";
    closeIcon.style.display = "inline";
  } else {
    hamburgerIcon.style.display = "inline";
    closeIcon.style.display = "none";
  }
});

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      hamburgerIcon.style.display = "inline";
      closeIcon.style.display = "none";
    }
  });
});

// Fechar menu ao redimensionar para desktop
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    hamburgerIcon.style.display = "inline";
    closeIcon.style.display = "none";
  }
});
