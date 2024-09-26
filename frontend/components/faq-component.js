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
      </section>
    `;
    }
}
customElements.define('faq-component', FAQComponent);
