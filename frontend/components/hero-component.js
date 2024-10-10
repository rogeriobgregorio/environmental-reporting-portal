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
              Ao relatar um crime ambiental, você contribui para a proteção da fauna, flora e recursos naturais.
            </p>

            <div class="details-grid">

              <div class="detail-item">
                <i class="fas fa-check-circle"></i> <strong>80%</strong>&nbsp; de taxa de retorno das autoridades
              </div>

               <div class="detail-item">
                <i class="fas fa-bell"></i> <strong>Receba atualizações</strong>&nbsp; de status por e-mail
              </div>

              <div class="detail-item">
                <i class="fas fa-globe"></i> <strong>Impacto global:</strong>&nbsp; Ações em 12 países
              </div>

              <div class="detail-item">
                <i class="fas fa-user-secret"></i> <strong>Anonimato</strong>&nbsp; totalmente preservado
              </div>

              <div class="detail-item">
                <i class="fas fa-leaf"></i> <strong>+2000</strong>&nbsp; denúncias registradas
              </div>

              <div class="detail-item">
                <i class="fas fa-shield-alt"></i> <strong>Dados seguros</strong>&nbsp; com criptografia
              </div>

            </div>
          </div>

        </div>
      </section>
    `;
  }
}

customElements.define("hero-component", HeroComponent);
