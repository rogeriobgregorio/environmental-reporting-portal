class TestimonialsComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <section id="testimonials" class="testimonials">
        <h2>O que as Pessoas estão Dizendo?</h2>
        <div class="testimonial">
          <img src="assets/images/profile-user.svg" alt="Avatar usuário">
          <p>"A plataforma é super intuitiva e fácil de usar. Já fiz várias denúncias".</p>
        </div>
        <div class="testimonial">
          <img src="assets/images/profile-user.svg" alt="Avatar usuário">
          <p>"É incrível poder acompanhar o status das denúncias em tempo real".</p>
        </div>
        <div class="testimonial">
          <img src="assets/images/profile-user.svg" alt="Avatar usuário">
          <p>"Sinto segurança denúnciando crimes ambientais de forma anônima".</p>
        </div>
      </section>
    `;
    }
}
customElements.define('testimonials-component', TestimonialsComponent);
