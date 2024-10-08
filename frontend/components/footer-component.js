class FooterComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>

        <div class="footer-links">
          <a href="./terms.html">Termos de Uso</a>
          <a href="./policy.html">Políticas de Privacidade</a>
          <a href="./lgpd.html">LGPD</a>
        </div>
        
        <p>&copy; 2024 ECOAR - Todos os direitos reservados</p>

      </footer>
    `;
  }
}
customElements.define("footer-component", FooterComponent);
