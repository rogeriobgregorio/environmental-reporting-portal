class FooterComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <footer>

        <div class="footer-links">
          <a href="#">Termos de Uso</a>
          <a href="#">Política de Privacidade</a>
          <a href="#">LGPD</a>
        </div>
        
        <p>&copy; 2024 ECOAR - Todos os direitos reservados</p>

      </footer>
    `;
    }
}
customElements.define('footer-component', FooterComponent);
