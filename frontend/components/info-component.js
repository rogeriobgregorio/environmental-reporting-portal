class InfoComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="informativos" class="info">

        <h2>Como contribuir para a preservação?</h2>

        <div class="cards">

          <div class="card">
            <h3>Dicas Sustentáveis</h3>
            <p>Adote práticas sustentáveis no seu dia a dia para ajudar o meio ambiente.</p>
            <a href="./tips.html">Saiba mais</a>
          </div>

          <div class="card">
            <h3>Leis Ambientais</h3>
            <p>Entenda as leis que protegem a natureza e como elas funcionam no Brasil.</p>
            <a href="./laws.html">Saiba mais</a>
          </div>

          <div class="card">
            <h3>Ações Globais</h3>
            <p>Conheça as iniciativas globais para combater a mudança do clima e seus impactos.</p>
            <a href="./actions.html">Saiba mais</a>
          </div>

        </div>
        
      </section>
    `;
  }
}
customElements.define("info-component", InfoComponent);
