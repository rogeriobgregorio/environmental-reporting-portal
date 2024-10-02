class ContactComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <section id="contato" class="contact-section">
        <h2>Entre em Contato Conosco</h2>
        <form id="contactForm" class="contact-form">
          <div class="form-group">
            <label for="name">Nome:</label>
            <input type="text" id="name" name="name" required>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="message">Mensagem:</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" class="submit-btn">Enviar Mensagem</button>
        </form>
      </section>
    `;
    }
}
customElements.define('contact-component', ContactComponent);
