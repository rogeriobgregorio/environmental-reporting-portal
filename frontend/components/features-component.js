class FeaturesComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <section id="features" class="features">
        <div>
            <h2>Vantagens de usar o ECOAR</h2>
            
            <div class="icon-section">
            
            <div class="icon-box">
                <i class="fas fa-tachometer-alt icon"></i>
                <h3>Monitoramento de Denúncias</h3>
                <p>Acompanhe suas denúncias em tempo real, com atualizações sobre o status e a resolução, garantindo transparência no processo.</p>
            </div>
            
            <div class="icon-box">
                <i class="fas fa-user-shield icon"></i>
                <h3>Segurança e Anonimato</h3>
                <p>Sua identidade é protegida, permitindo denunciar crimes ambientais de forma anônima e segura, sem comprometer sua segurança pessoal.</p>
            </div>
            
            <div class="icon-box">
                <i class="fas fa-globe icon"></i>
                <h3>Impacto Ambiental</h3>
                <p>Contribua para a preservação da natureza, unindo-se a uma comunidade engajada em ações concretas em prol do meio ambiente.</p>
            </div>

            </div>
        </div>
        </section>
    `;
  }
}
customElements.define("features-component", FeaturesComponent);
