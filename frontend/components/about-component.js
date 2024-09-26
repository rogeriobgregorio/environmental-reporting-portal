class AboutComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <section id="about" class="about">
        <div>
          <h2>O Que é o ECOAR?</h2>
          <p>O ECOAR é uma plataforma que incentiva a denúncia de crimes ambientais...</p>
        </div>
        <img src="https://via.placeholder.com/500" alt="Imagem sobre ECOAR">
      </section>
    `;
    }
}
customElements.define('about-component', AboutComponent);
