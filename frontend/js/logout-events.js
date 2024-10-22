export function initLogoutEventListeners(hamburger, menu, logoutLink) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
  });

  window.addEventListener("scroll", () => {
    const header = hamburger.closest("header");
    header.classList.toggle("shadow", window.scrollY > 50);
  });

  logoutLink.addEventListener("click", (event) => {
    event.preventDefault(); 
    localStorage.clear(); 
    window.location.href = "./login.html"; 
  });
}
