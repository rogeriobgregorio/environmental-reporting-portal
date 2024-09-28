class HeaderComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <div class="logo">
          <img src="assets/images/ecoar-logo.svg" alt="Logo ECOAR" id="logo">
        </div>
        <nav class="menu">
          <ul>
            <li><a href="#hero">Início</a></li>
            <li><a href="#about">Sobre</a></li>
            <li><a href="#denuncias">Denúncias</a></li>
            <li><a href="#informativos">Informativos</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </nav>
        <a href="#" class="cta-btn-register">Cadastre-se</a>
      </header>
    `;
  }
}
customElements.define('header-component', HeaderComponent);
