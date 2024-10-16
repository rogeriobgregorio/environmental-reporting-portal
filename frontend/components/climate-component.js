class ClimateComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <section class="mudancas-climaticas">
        <div class="container">
            <h1>Mudanças Climáticas</h1>
            <p>
                As mudanças climáticas representam um dos maiores desafios globais da atualidade, com impactos 
                crescentes sobre os ecossistemas, a economia e a sociedade. Ação imediata é crucial para evitar 
                consequências ainda mais graves, como o aumento do nível do mar, eventos climáticos extremos e a 
                perda de biodiversidade. Aqui estão algumas maneiras de agir para mitigar esses efeitos.
            </p>

            <h2>1. Reduza sua pegada de carbono</h2>
            <p>
                A pegada de carbono refere-se à quantidade de gases de efeito estufa que uma pessoa, empresa ou 
                organização emite, diretamente ou indiretamente. Reduzir essa pegada é uma das formas mais eficazes
                 de combater as mudanças climáticas. Pequenas mudanças no dia a dia podem gerar grande impacto, 
                 como optar por meios de transporte mais sustentáveis e reduzir o consumo de energia.
            </p>
            <p>
                <strong>Dica:</strong> Use transporte público, bicicleta ou caminhe sempre que possível. Além disso,
                 opte por lâmpadas de LED, desligue os aparelhos eletrônicos quando não estiverem em uso e busque 
                 formas de energia renovável, como a solar.
            </p>

            <h2>2. Informe-se e eduque outros</h2>
            <p>
                A educação sobre as mudanças climáticas é essencial para que mais pessoas entendam o problema e atuem 
                para reduzi-lo. Compartilhar conhecimento e incentivar o diálogo são formas poderosas de aumentar a 
                conscientização e promover atitudes mais sustentáveis.
            </p>
            <p>
                <strong>Dica:</strong> Participe de cursos, webinars e eventos sobre sustentabilidade. Compartilhe artigos, 
                vídeos e pesquisas sobre o tema com sua rede social e com sua comunidade. A educação é a base para mudanças coletivas.
            </p>

            <h2>3. Apoie políticas ambientais</h2>
            <p>
                As políticas públicas desempenham um papel central na luta contra as mudanças climáticas. Elas regulam o 
                uso de recursos naturais, incentivam práticas sustentáveis e definem metas para a redução de emissões. 
                Participar de movimentos e apoiar legislações favoráveis ao meio ambiente são formas diretas de pressionar 
                governos e empresas a tomarem medidas concretas.
            </p>
            <p>
                <strong>Dica:</strong> Assine petições, participe de protestos pacíficos e apoie candidatos e projetos que
                 tenham compromissos claros com a proteção ambiental. Ficar atento às ações de governos e organizações 
                 internacionais também é fundamental para o acompanhamento do progresso na luta contra as mudanças climáticas.
            </p>

            <h2>4. Consuma de forma consciente</h2>
            <p>
                O consumo consciente é uma maneira poderosa de reduzir o impacto ambiental. Desde a escolha de produtos 
                sustentáveis até a redução do desperdício, cada ação conta. Optar por produtos com menor pegada de carbono,
                 apoiar marcas éticas e reduzir o consumo de itens que contribuem para o desmatamento e a poluição são atitudes essenciais.
            </p>
            <p>
                <strong>Dica:</strong> Evite o desperdício de alimentos, compre de empresas que priorizam a sustentabilidade
                 e reduza o consumo de carne, uma vez que a pecuária é uma das principais fontes de emissões de metano, 
                 um gás de efeito estufa muito potente.
            </p>

            <h2>5. Compense suas emissões</h2>
            <p>
                Mesmo após reduzir suas emissões, você pode compensar o restante por meio de iniciativas de reflorestamento, 
                conservação e geração de energia limpa. Muitas organizações oferecem programas de compensação de carbono, 
                permitindo que você neutralize sua pegada apoiando projetos que ajudam a remover carbono da atmosfera.
            </p>
            <p>
                <strong>Dica:</strong> Calcule sua pegada de carbono online e participe de programas de compensação por meio de 
                doações ou investimentos em projetos de reflorestamento e energias renováveis.
            </p>

        </div>
    </section>
    `;
  }
}
customElements.define("climate-component", ClimateComponent);
