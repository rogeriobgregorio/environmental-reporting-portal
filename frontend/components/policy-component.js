class PolicyComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="privacy-policy">
        <div class="container">
            <h1>Política de Privacidade</h1>
            <p>
                No ECOAR, a privacidade dos nossos visitantes é de extrema importância. Esta política de privacidade descreve os 
                tipos de informações pessoais que são coletadas e armazenadas por nossa plataforma, e como elas são utilizadas.
            </p>

            <h2>1. Informações que Coletamos</h2>
            <p>
                Coletamos informações pessoais que você nos fornece diretamente ao criar uma conta, fazer uma denúncia ou se 
                cadastrar em nossa plataforma. Isso pode incluir seu nome, email, telefone e outras informações relevantes.
            </p>

            <h2>2. Uso das Informações</h2>
            <p>
                As informações coletadas são utilizadas para operar, manter e melhorar nossos serviços. Elas também podem ser usadas 
                para comunicação com o usuário, como envio de notificações e atualizações sobre as denúncias feitas na plataforma.
            </p>

            <h2>3. Compartilhamento de Informações</h2>
            <p>
                O ECOAR não compartilha suas informações pessoais com terceiros, exceto 
                quando exigido por lei ou para proteger nossos direitos legais.
            </p>

            <h2>4. Segurança das Informações</h2>
            <p>
                Tomamos medidas de segurança apropriadas para proteger suas informações 
                pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>

            <h2>5. Seus Direitos</h2>
            <p>
                Você tem o direito de acessar, corrigir ou excluir suas informações pessoais armazenadas 
                em nossa plataforma. Para isso, entre em contato conosco pelos canais disponíveis.
            </p>

            <h2>6. Alterações na Política de Privacidade</h2>
            <p>
                Reservamo-nos o direito de modificar esta Política de Privacidade a qualquer momento. 
                Recomendamos que você revise esta página regularmente para estar ciente de qualquer alteração.
            </p>
        </div>
    </section>
    `;
  }
}
customElements.define("policy-component", PolicyComponent);
