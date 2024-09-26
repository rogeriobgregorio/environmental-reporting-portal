class TestimonialsComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <section id="testimonials" class="testimonials">
        <h2>O que as Pessoas estão Dizendo?</h2>
        <div class="testimonial">
          <img src="https://via.placeholder.com/50" alt="Avatar usuário">
          <p>O ECOAR me ajudou a denunciar crimes ambientais rapidamente...</p>
        </div>
      </section>
    `;
    }
}
customElements.define('testimonials-component', TestimonialsComponent);
