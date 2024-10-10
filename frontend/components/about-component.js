class AboutComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="sobre" class="about">

        <div>
          <h2>O que é o ECOAR?</h2>

          <p>
            O ECOAR (Espaço de Conscientização e Ação Ambiental Responsável) é uma plataforma digital dedicada 
            à denúncia de crimes ambientais e à promoção de ações em prol da preservação do meio ambiente. 
            Através do ECOAR, usuários podem reportar quaisquer atividades ilegais que prejudiquem a natureza, como desmatamento, 
            poluição ou caça ilegal, permitindo que essas denúncias sejam visualizadas pela comunidade e pelas autoridades responsáveis.
          </p>

          <br>
          
          <p>
            Além de ser um portal para denúncias, o ECOAR também tem uma função educativa, oferecendo informativos 
            sobre práticas sustentáveis, leis ambientais e mudanças climáticas, com o objetivo de conscientizar a 
            população sobre a importância da preservação ambiental.
          </p>
        </div>

        <div class="icon-section">

          <div class="icon-box">
            <i class="fas fa-bullseye icon"></i>
            <h3>Missão</h3>
            <p>Promover a conscientização e a ação coletiva na luta contra crimes ambientais, fortalecendo a preservação do planeta.</p>
          </div>

          <div class="icon-box">
            <i class="fas fa-eye icon"></i>
            <h3>Visão</h3>
            <p>Ser uma referência global em defesa ambiental, mobilizando comunidades em prol de um futuro sustentável.</p>
          </div>

          <div class="icon-box">
            <i class="fas fa-hand-holding-heart icon"></i>
            <h3>Valores</h3>
            <p>Ética, transparência, responsabilidade ambiental e a importância da colaboração entre comunidades e instituições.</p>
          </div>

        </div>

      </section>
    `;
  }
}
customElements.define("about-component", AboutComponent);
