const menuButton = document.querySelector("#menu");
const nav = document.querySelector("#nav");
const hamburgerIcon = document.querySelector(".hamburger-icon");
const closeIcon = document.querySelector(".close-icon");

// Função para verificar se está em mobile
function isMobile() {
  return window.innerWidth < 768;
}

// Alternar menu mobile
menuButton.addEventListener("click", () => {
  if (isMobile()) {
    const isOpen = nav.classList.toggle("open");
    menuButton.classList.toggle("active", isOpen);
    menuButton.setAttribute("aria-expanded", isOpen);
  }
});

// Fechar menu ao clicar em um link (apenas mobile)
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (isMobile()) {
      nav.classList.remove("open");
      menuButton.classList.remove("active");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
});

// Reset menu quando redimensionar para desktop
function resetMenuForDesktop() {
  if (!isMobile()) {
    nav.classList.remove("open");
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
  }
}

// Verificar ao carregar e redimensionar
window.addEventListener("load", resetMenuForDesktop);
window.addEventListener("resize", resetMenuForDesktop);
