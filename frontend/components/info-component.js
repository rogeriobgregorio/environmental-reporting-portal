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
            <p>Conheça as iniciativas globais para combater as mudanças climáticas.</p>
            <a href="./actions.html">Saiba mais</a>
          </div>

          <div class="card">
            <h3>Consumo Consciente</h3>
            <p>Aprenda a escolher produtos que respeitam o meio ambiente e como reduzir o desperdício.</p>
            <a href="./consumption.html">Saiba mais</a>
          </div>

          <div class="card">
            <h3>Reciclagem e Reutilização</h3>
            <p>Entenda como separar o lixo corretamente e dê uma nova vida a itens que você não usa mais.</p>
            <a href="./recycling.html">Saiba mais</a>
          </div>

          <div class="card">
            <h3>Energias Renováveis</h3>
            <p>Conheça as diferentes fontes de energia limpa e como elas ajudam a reduzir a poluição.</p>
            <a href="./energy.html">Saiba mais</a>
          </div>

          <div class="card">
            <h3>Preservação da Biodiversidade</h3>
            <p>Descubra a importância da diversidade de espécies e como protegê-las em seus habitats naturais.</p>
            <a href="./biodiversity.html">Saiba mais</a>
          </div>

          <div class="card">
            <h3>Mudanças Climáticas</h3>
            <p>Compreenda os impactos das mudanças climáticas e como você pode ajudar a combatê-las.</p>
            <a href="./climate.html">Saiba mais</a>
          </div>

          <div class="card">
            <h3>Voluntariado Ambiental</h3>
            <p>Junte-se a iniciativas locais e faça a diferença na sua comunidade por meio do voluntariado.</p>
            <a href="./volunteering.html">Saiba mais</a>
          </div>

        </div>
        
      </section>
    `;
  }
}
customElements.define("info-component", InfoComponent);
