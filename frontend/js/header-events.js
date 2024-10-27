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

export function getUserRole() {
  const token = localStorage.getItem("jwtToken");
  if (!token) return null;

  const payloadBase64 = token.split(".")[1];
  const payloadDecoded = atob(payloadBase64);
  const payload = JSON.parse(payloadDecoded);

  return payload.role;
}

export function getAuthInfo() {
  const isLoggedIn = !!localStorage.getItem("jwtToken");
  const isRestrictedPage =
    window.location.pathname.endsWith("profile.html") ||
    window.location.pathname.endsWith("admin.html");
  const userRole = isLoggedIn ? getUserRole() : null;

  return { isLoggedIn, isRestrictedPage, userRole };
}

export function handleAuthLinkClick(authLink) {
  const { isLoggedIn } = getAuthInfo();

  if (isLoggedIn) {
    authLink.addEventListener("click", () => {
      localStorage.removeItem("jwtToken");
      window.location.href = "./login.html";
    });
  }
}
