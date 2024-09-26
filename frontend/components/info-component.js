
class InfoComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <section id="informativos" class="info">
        <h2>Como Contribuir para a Preservação?</h2>
        <div class="cards">
          <div class="card">
            <h3>Dicas Sustentáveis</h3>
            <p>Adote práticas sustentáveis no seu dia a dia para ajudar o meio ambiente.</p>
          </div>
          <div class="card">
            <h3>Leis Ambientais</h3>
            <p>Entenda as leis que protegem a natureza e como elas funcionam no Brasil.</p>
          </div>
          <div class="card">
            <h3>Ações Globais</h3>
            <p>Conheça as iniciativas globais para combater as mudanças climáticas.</p>
          </div>
        </div>
      </section>
    `;
    }
}
customElements.define('info-component', InfoComponent);
