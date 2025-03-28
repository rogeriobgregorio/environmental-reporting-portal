import { initializeHeroEvents } from "../js/hero-events.js";

class HeroComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="hero" class="hero">
        <div class="hero-content">
          <h1>Seja a Voz da Natureza</h1>

          <h2>
            Denuncie agressões ambientais e ajude a <br> 
            propagar ações em defesa do planeta.
          </h2>

          <a href="#" id="cta-btn-report" class="cta-btn-report">Quero fazer uma denúncia</a>

        </div>
      </section>
    `;

    initializeHeroEvents();
  }
}
customElements.define("hero-component", HeroComponent);
