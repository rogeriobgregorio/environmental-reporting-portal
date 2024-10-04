class AboutComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <section id="about" class="about">

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

        <img src="assets/images/about-image.jpg" alt="Imagem sobre ECOAR">
        
      </section>
    `;
    }
}
customElements.define('about-component', AboutComponent);