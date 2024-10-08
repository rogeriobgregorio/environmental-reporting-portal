class TestimonialsComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="testimonials" class="testimonials">
        <h2>O que as pessoas estão dizendo?</h2>
        
        <div class="testimonial">
          <i class="fas fa-user-circle"></i>
          <div class="testimonial-text">
            <q>A plataforma é super intuitiva e fácil de usar. Já fiz várias denúncias de situações que prejudicam o meio ambiente.</q>
            <span class="user-name">João Silva</span>
          </div>
        </div>
        
        <div class="testimonial">
          <i class="fas fa-user-circle"></i>
          <div class="testimonial-text">
            <q>É incrível poder acompanhar o status das denúncias em tempo real e também receber atualizações via e-mail.</q>
            <span class="user-name">Maria Fernandes</span>
          </div>
        </div>
        
        <div class="testimonial">
          <i class="fas fa-user-circle"></i>
          <div class="testimonial-text">
            <q>Me sinto mais seguro podendo denunciar crimes ambientais, da região onde eu moro, em total anonimato.</q>
            <span class="user-name">Usuário Anônimo</span>
          </div>
        </div>
        
      </section>
    `;
  }
}
customElements.define("testimonials-component", TestimonialsComponent);
