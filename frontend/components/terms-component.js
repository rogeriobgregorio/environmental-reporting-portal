class TermsComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="terms-section">
        <h1>Termos de Uso</h1>

        <h2>1. Introdução</h2>
        <p>
            Bem-vindo ao ECOAR! Ao acessar e utilizar nossa 
            plataforma, você concorda em cumprir e estar 
            vinculado aos seguintes Termos de Uso. Se você 
            não concordar com estes termos, por favor, 
            não utilize nossos serviços.
        </p>

        <h2>2. Uso Aceitável</h2>
        <p>
            Ao utilizar nossa plataforma, você se compromete a não violar as leis aplicáveis 
            e a respeitar os direitos de terceiros. Você não deve utilizar o ECOAR para:
        </p>
        <ul>
            <li>Transmitir conteúdo ilegal, difamatório, obsceno ou prejudicial;</li>
            <li>Violar os direitos de propriedade intelectual de terceiros;</li>
            <li>Realizar atividades fraudulentas ou enganosas;</li>
            <li>Tentar comprometer a segurança do nosso site ou da conta de outros usuários.</li>
        </ul>

        <h2>3. Propriedade Intelectual</h2>
        <p>
            Todo o conteúdo disponível no ECOAR, incluindo textos, gráficos, logotipos, 
            ícones, imagens, vídeos e áudios, são de nossa propriedade ou licenciados 
            para nós. Você não está autorizado a reproduzir, distribuir ou modificar 
            qualquer conteúdo sem nosso consentimento prévio.
        </p>

        <h2>4. Alterações dos Termos</h2>
        <p>
            Podemos revisar estes Termos de Uso periodicamente. Quaisquer 
            alterações entrarão em vigor imediatamente após sua publicação 
            no site. Recomendamos que você reveja esta página regularmente 
            para se manter informado sobre nossas atualizações.
        </p>
    </section>
    `;
  }
}
customElements.define("terms-component", TermsComponent);
