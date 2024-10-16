class RecyclingComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <section class="reciclagem-reutilizacao">
            <div class="container">
                <h1>Reciclagem e Reutilização</h1>
                <p>
                    A reciclagem e a reutilização são essenciais para reduzir o volume de resíduos que geramos e dar uma nova vida aos produtos. Ao adotar essas práticas, contribuímos não apenas para a diminuição da poluição e do desperdício, mas também para a economia circular, onde os recursos são reaproveitados em vez de descartados. Vamos explorar como podemos fazer a diferença no nosso dia a dia!
                </p>

                <h2>1. Separe seus lixos</h2>
                <p>
                    Separe os resíduos recicláveis dos não recicláveis. Utilize recipientes diferentes para papel, 
                    plástico, vidro e resíduos orgânicos. Conheça os pontos de coleta da sua cidade e participe de
                     programas de reciclagem comunitários. Essa ação simples facilita o processo de reciclagem e
                      ajuda as empresas de coleta a gerenciar melhor os resíduos.
                </p>
                <p>
                    <strong>Dica:</strong> Faça uso de etiquetas para identificar facilmente os diferentes tipos de resíduos em casa.
                </p>

                <h2>2. Reutilize embalagens</h2>
                <p>
                    Utilize embalagens vazias para armazenar outros produtos ou para projetos DIY (faça você mesmo). 
                    Garrafas de vidro podem se transformar em vasos de plantas, e potes plásticos podem ser usados 
                    para organizar itens pequenos. Ao reutilizar, você não só economiza dinheiro, mas também reduz
                     a demanda por novos produtos e embalagens.
                </p>
                <p>
                    <strong>Dica:</strong> Pesquise ideias criativas de reutilização online para inspirar seus projetos.
                </p>

                <h2>3. Dê destino correto aos resíduos</h2>
                <p>
                    Informe-se sobre onde descartar corretamente produtos como pilhas, eletrônicos e outros materiais especiais.
                     Esses itens não devem ser jogados no lixo comum, pois podem causar danos ao meio ambiente. Muitas cidades 
                     oferecem pontos de coleta específicos para esses resíduos perigosos.
                </p>
                <p>
                    <strong>Dica:</strong> Crie um calendário em sua casa para lembrar as datas de coleta de lixo eletrônico e outros materiais especiais.
                </p>

                <h2>4. Compre produtos reciclados</h2>
                <p>
                    Sempre que possível, opte por produtos feitos de materiais reciclados. Isso não apenas ajuda a reduzir a 
                    quantidade de lixo, mas também incentiva as empresas a adotarem práticas mais sustentáveis em sua produção. 
                    Além disso, muitos produtos reciclados são de alta qualidade e funcionais.
                </p>
                <p>
                    <strong>Dica:</strong> Procure por selos de certificação que garantam a origem reciclada dos produtos.
                </p>

                <h2>5. Eduque-se e compartilhe conhecimento</h2>
                <p>
                    A conscientização sobre a importância da reciclagem e reutilização começa com a educação. Informe-se sobre o 
                    impacto ambiental dos resíduos e compartilhe esse conhecimento com amigos e familiares. Juntos, vocês podem 
                    formar um movimento para promover a sustentabilidade na comunidade.
                </p>
                <p>
                    <strong>Dica:</strong> Participe de workshops ou palestras sobre reciclagem e sustentabilidade para aprofundar seus conhecimentos.
                </p>
            </div>
        </section>
    `;
  }
}
customElements.define("recycling-component", RecyclingComponent);
