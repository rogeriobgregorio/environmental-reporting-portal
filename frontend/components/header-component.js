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
            <li><a href="./index.html#sobre">Sobre nós</a></li>
            <li><a href="./index.html#denuncias">Denúncias</a></li>
            <li><a href="./index.html#informativos">Informe-se</a></li>
            <li><a href="./index.html#contato">Contato</a></li>
          </ul>
        </nav>

        <a href="#" class="cta-btn-register">Cadastre-se</a>

        <div class="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
    `;

    const hamburger = this.querySelector(".hamburger");
    const menu = this.querySelector(".menu");

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      menu.classList.toggle("active");
    });

    window.addEventListener("scroll", function () {
      const header = document.querySelector("header");
      if (window.scrollY > 50) {
        header.classList.add("shadow");
      } else {
        header.classList.remove("shadow");
      }
    });
  }
}
customElements.define("header-component", HeaderComponent);
