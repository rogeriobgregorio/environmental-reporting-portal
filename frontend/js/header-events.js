// headerEvents.js
export function initHeaderEventListeners(hamburger, menu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
  });

  window.addEventListener("scroll", () => {
    const header = hamburger.closest("header");
    header.classList.toggle("shadow", window.scrollY > 50);
  });
}
