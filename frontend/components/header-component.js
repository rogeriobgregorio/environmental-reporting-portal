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
        
      </header>
    `;
  }
}
customElements.define("header-component", HeaderComponent);
