
class HeroComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <section id="hero" class="hero">
        <h1>Seja a Voz da Natureza</h1>
        <h2>Denuncie agressões ambientais e ajude a propagar ações em defesa do planeta.</h2>
        <a href="#about" class="cta-btn">Saiba Mais sobre ECOAR</a>
      </section>
    `;
    }
}
customElements.define('hero-component', HeroComponent);
