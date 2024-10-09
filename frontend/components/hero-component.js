class HeroComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <section id="hero" class="hero">
      <div class="hero-content">

        <h1>Seja a Voz da Natureza</h1>
        
        <h2>
          Denuncie agressões ambientais e ajude a
          <br> 
          propagar ações em defesa do planeta.
        </h2>

        <a href="#about" class="cta-btn-report">Quero fazer uma denúncia</a>

       <div class="hero-details">

          <p>
            <strong>A sua denúncia pode fazer a diferença!</strong> 
            <br>
            Ao relatar um crime ambiental, 
            você contribui diretamente 
            <br>
            para a proteção da fauna, flora e recursos naturais.
          </p>

          <ul>
            <li><strong>80%</strong> das denúncias tiveram retorno das autoridades</li>
            <li><strong>Impacto global:</strong> Ações tomadas em 12 países</li>
            <li><strong>+2000 denúncias</strong> registradas até agora</li>
          </ul>

        </div>

      </div>
    </section>
    `;
  }
}
customElements.define("hero-component", HeroComponent);
