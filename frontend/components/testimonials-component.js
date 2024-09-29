class TestimonialsComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="testimonials" class="testimonials">
        <h2>O que as pessoas estão dizendo?</h2>
        
        <div class="testimonial">
          <img src="assets/images/profile-user.svg" alt="Avatar usuário">
          <div class="testimonial-text">
            <p>"A plataforma é super intuitiva e fácil de usar. Já fiz várias denúncias de situações que prejudicam o meio ambiente."</p>
            <span class="user-name">João Silva</span>
          </div>
        </div>
        
        <div class="testimonial">
          <img src="assets/images/profile-user.svg" alt="Avatar usuário">
          <div class="testimonial-text">
            <p>"É incrível poder acompanhar o status das denúncias em tempo real e também receber atualizações via e-mail."</p>
            <span class="user-name">Maria Fernandes</span>
          </div>
        </div>
        
        <div class="testimonial">
          <img src="assets/images/profile-user.svg" alt="Avatar usuário">
          <div class="testimonial-text">
            <p>"Me sinto mais seguro podendo denunciar crimes ambientais, da região onde eu moro, em total anonimato."</p>
            <span class="user-name">Carlos Oliveira</span>
          </div>
        </div>
        
      </section>
    `;
  }
}
customElements.define('testimonials-component', TestimonialsComponent);
