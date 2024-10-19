import { initHeaderEventListeners } from "../js/header-events.js";

class HeaderComponent extends HTMLElement {
  connectedCallback() {
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
            <li><a href="./login.html">Entrar</a></li>
          </ul>
        </nav>

        <div class="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
    `;

    const hamburger = this.querySelector(".hamburger");
    const menu = this.querySelector(".menu");

    initHeaderEventListeners(hamburger, menu);
  }
}
customElements.define("header-component", HeaderComponent);
