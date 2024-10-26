// header-events.js
export function initHeaderEventListeners(hamburger, menu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
  });

  window.addEventListener("scroll", () => {
    const header = hamburger.closest("header");
    header.classList.toggle("shadow", window.scrollY > 50);
  });

  const isLoginPage = window.location.pathname.endsWith("login.html");
  const authLink = document.querySelector("#authLink");

  if (isLoginPage && authLink) {
    authLink.textContent = "Cadastrar-se";
    authLink.href = "./register.html";
  }
}
