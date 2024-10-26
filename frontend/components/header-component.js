import { initHeaderEventListeners } from "../js/header-events.js";

class HeaderComponent extends HTMLElement {
  connectedCallback() {
    const isLoggedIn = !!localStorage.getItem("jwtToken");
    const isRestrictedPage =
      window.location.pathname.endsWith("profile.html") ||
      window.location.pathname.endsWith("admin.html");
    const userRole = isLoggedIn ? getUserRole() : null;

    this.innerHTML = `
      <header>
        <div class="logo">
          <a href="./index.html#">
            <img src="./assets/images/ecoar-logo.svg" alt="Logo ECOAR" id="logo">
          </a>
        </div>

        <nav class="menu">
          <ul>
            <li><a href="./index.html#">Início</a></li>            
            <li><a href="./index.html#">Denúncias</a></li>            
            <li><a href="./info.html">Informativos</a></li>
            <li><a href="./about.html">Sobre nós</a></li>            
            <li><a href="./contact.html">Contato</a></li>
            ${
              isLoggedIn && !isRestrictedPage
                ? `<li><a href="${
                    userRole === "ROLE_ADMIN"
                      ? "./admin.html"
                      : "./profile.html"
                  }">Meu perfil</a></li>`
                : ""
            }
            <li><a href="${isLoggedIn ? "#" : "./login.html"}" id="authLink">${
      isLoggedIn ? "Sair" : "Entrar"
    }</a></li>
          </ul>
        </nav>

        <div class="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
    `;

    const authLink = this.querySelector("#authLink");

    if (isLoggedIn) {
      authLink.addEventListener("click", () => {
        localStorage.removeItem("jwtToken");
        window.location.href = "./login.html";
      });
    }

    const hamburger = this.querySelector(".hamburger");
    const menu = this.querySelector(".menu");

    initHeaderEventListeners(hamburger, menu);
  }
}

function getUserRole() {
  const token = localStorage.getItem("jwtToken");
  if (!token) return null;

  const payloadBase64 = token.split(".")[1];
  const payloadDecoded = atob(payloadBase64);
  const payload = JSON.parse(payloadDecoded);

  return payload.role;
}

customElements.define("header-component", HeaderComponent);
