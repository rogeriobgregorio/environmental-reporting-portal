class TipsComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <section class="dicas-sustentaveis">
        <div class="container">
            <h1>Dicas Sustentáveis</h1>
            <p>
                Adote práticas sustentáveis no seu dia a dia e contribua para a preservação do meio ambiente. 
                Pequenas ações podem gerar grandes impactos quando praticadas coletivamente. Aqui estão algumas 
                dicas simples para viver de maneira mais sustentável e consciente.
            </p>

            <h2>1. Reduza o Consumo de Plástico</h2>
            <p>
                Evite o uso de plásticos descartáveis, como canudos, copos e sacolas. Opte por produtos 
                reutilizáveis e procure sempre carregar uma garrafa e sacola reutilizáveis com você.
            </p>

            <h2>2. Economize Água</h2>
            <p>
                Feche a torneira enquanto escova os dentes ou ensaboa as mãos. Aproveite a água da chuva para 
                regar plantas e escolha equipamentos domésticos que economizem água, como chuveiros de baixo fluxo.
            </p>

            <h2>3. Pratique a Reciclagem</h2>
            <p>
                Separe seus resíduos recicláveis dos orgânicos. Informe-se sobre os pontos de coleta na 
                sua região e dê destino correto aos materiais recicláveis como papel, plástico, vidro e metal.
            </p>

            <h2>4. Consuma de Forma Consciente</h2>
            <p>
                Antes de comprar algo novo, pergunte-se se realmente precisa desse item. Priorize marcas que 
                têm compromisso com a sustentabilidade e procure reutilizar ou consertar produtos sempre que possível.
            </p>

            <h2>5. Opte por Transporte Sustentável</h2>
            <p>
                Quando possível, troque o carro por transportes públicos, bicicleta ou até caminhar. 
                Isso ajuda a reduzir a emissão de gases poluentes e melhora sua qualidade de vida.
            </p>

            <h2>6. Reduza o Desperdício de Alimentos</h2>
            <p>
                Planeje suas refeições, faça compras conscientes e utilize alimentos de forma integral 
                para evitar o desperdício. Composte restos orgânicos para adubar plantas e jardins.
            </p>

            <h2>7. Apoie Projetos de Sustentabilidade</h2>
            <p>
                Participe ou apoie iniciativas locais que promovem a sustentabilidade. Ações comunitárias, como 
                coleta de lixo em praias e plantio de árvores, são ótimas maneiras de fazer a diferença.
            </p>
        </div>
    </section>
    `;
  }
}
customElements.define("tips-component", TipsComponent);
