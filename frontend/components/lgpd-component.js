class LGPDComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <section class="lgpd-policy">
        <div class="container">
            <h1>LGPD - Lei Geral de Proteção de Dados</h1>
            <p>
                A Lei Geral de Proteção de Dados Pessoais (LGPD) (Lei nº 13.709/2018) estabelece regras sobre a coleta, 
                armazenamento, tratamento e compartilhamento de dados pessoais no Brasil, com o objetivo de proteger a 
                privacidade dos cidadãos. No ECOAR, estamos comprometidos com a conformidade dessa legislação.
            </p>

            <h2>1. Dados Pessoais Coletados</h2>
            <p>
                Os dados pessoais coletados pelo ECOAR incluem nome, email e qualquer outra informação fornecida diretamente 
                por você ao interagir com a nossa plataforma, seja para criação de conta ou realização de denúncias.
            </p>

            <h2>2. Finalidade do Tratamento de Dados</h2>
            <p>
                Utilizamos seus dados pessoais para garantir a operação adequada do ECOAR, bem como para 
                manter contato com você a respeito de denúncias e informações relevantes sobre o meio ambiente.
            </p>

            <h2>3. Direitos dos Titulares de Dados</h2>
            <p>
                De acordo com a LGPD, você tem o direito de solicitar o acesso, correção, exclusão e portabilidade dos seus dados 
                pessoais, bem como a limitação ou oposição ao tratamento dos mesmos. Entre em contato conosco para exercer seus direitos.
            </p>

            <h2>4. Segurança dos Dados</h2>
            <p>
                O ECOAR adota medidas de segurança apropriadas para proteger seus dados contra 
                acessos não autorizados, perdas acidentais e outros incidentes de segurança.
            </p>

            <h2>5. Compartilhamento de Dados</h2>
            <p>
                Seus dados pessoais não serão compartilhados com terceiros, exceto conforme necessário para 
                cumprimento de obrigações legais ou para proteger os direitos do ECOAR e seus usuários.
            </p>

            <h2>6. Consentimento</h2>
            <p>
                Ao utilizar nossa plataforma e fornecer suas informações pessoais, você concorda com 
                o tratamento de seus dados conforme descrito nesta política e em conformidade com a LGPD.
            </p>

            <h2>7. Alterações na Política de Privacidade</h2>
            <p>
                Esta política poderá ser atualizada periodicamente para refletir mudanças na legislação 
                ou em nossos procedimentos internos. Sugerimos que você revise esta página regularmente.
            </p>
        </div>
    </section>
    `;
  }
}
customElements.define("lgpd-component", LGPDComponent);
