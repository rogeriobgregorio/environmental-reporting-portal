class FAQComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <section id="faq" class="faq">
        <h2>Dúvidas Frequentes</h2>
        <div class="faq-item">
          <h3>Como faço uma denúncia?</h3>
          <p>Para fazer uma denúncia, basta cadastrar-se na plataforma e seguir os passos indicados na seção de denúncias.</p>
        </div>
        <div class="faq-item">
          <h3>Minha denúncia será anônima?</h3>
          <p>Sim, você pode optar por fazer sua denúncia de forma anônima para garantir sua segurança.</p>
        </div>
        <div class="faq-item">
          <h3>Que tipo de crimes ambientais posso denunciar?</h3>
          <p>Você pode denunciar qualquer atividade que prejudique o meio ambiente, como desmatamento ilegal, poluição, caça de espécies protegidas e muito mais.</p>
        </div>
        <div class="faq-item">
          <h3>Como o ECOAR protege minhas informações?</h3>
          <p>Usamos tecnologias avançadas de criptografia e armazenamento seguro para garantir que seus dados e denúncias estejam sempre protegidos.</p>
        </div>
        <div class="faq-item">
          <h3>O serviço de denúncias é gratuito?</h3>
          <p>Sim, você não precisa pagar nada para utilizar os serviços disponíveis na nossa plataforma.</p>
        </div>
      </section>
    `;
    }
}
customElements.define('faq-component', FAQComponent);
