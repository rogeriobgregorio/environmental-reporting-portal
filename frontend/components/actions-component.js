class ActionsComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <section class="ods-13">
        <div class="container">
            <h1>ODS13: Ação Climática</h1>
            <p>
                A Agenda 2030 da ONU estabelece 17 Objetivos de Desenvolvimento Sustentável (ODS) 
                com metas claras para proteger o planeta, acabar com a pobreza e garantir prosperidade 
                para todos. O ODS 13 trata especificamente da necessidade de uma ação urgente para combater 
                as alterações climáticas e seus impactos.
            </p>

            <h2>Por que o ODS 13 é importante?</h2>
            <p>
                A mudança climática é uma das maiores ameaças que o mundo enfrenta hoje. Seus impactos são globais 
                e sem precedentes, afetando economias, meios de subsistência e ecossistemas em todo o planeta. Sem 
                ações urgentes, as consequências podem ser devastadoras, incluindo o aumento de desastres naturais, 
                elevação do nível do mar, escassez de alimentos e migração forçada de populações.
            </p>

            <h2>Metas do ODS 13</h2>
            <ul>
                <li>Fortalecer a resiliência e a capacidade de adaptação aos riscos 
                relacionados ao clima e desastres naturais em todos os países.</li>
                <li>Integrar medidas de mudança do clima nas políticas, estratégias e planejamentos nacionais.</li>
                <li>Melhorar a educação, a conscientização e a capacidade humana e institucional 
                sobre mitigação, adaptação, impacto e alerta precoce da mudança do clima.</li>
                <li>Mobilizar US$ 100 bilhões anualmente até 2020 para atender às necessidades dos países em 
                desenvolvimento e apoiar ações de mitigação e adaptação às mudanças climáticas.</li>
                <li>Promover mecanismos para aumentar a capacidade de planejamento e gestão eficaz em relação 
                à mudança climática nos países menos desenvolvidos e nos pequenos Estados insulares em desenvolvimento.</li>
            </ul>

            <h2>O Papel de cada um de nós</h2>
            <p>
                Todos têm um papel a desempenhar na luta contra as mudanças climáticas. Governos, 
                empresas e cidadãos podem adotar práticas sustentáveis e reduzir as emissões de 
                gases de efeito estufa. Algumas ações que podem ser tomadas incluem:
            </p>
            <ul>
                <li>Reduzir o consumo de energia e optar por fontes renováveis.</li>
                <li>Diminuir o desperdício de água e alimentos.</li>
                <li>Adotar meios de transporte sustentáveis, como bicicletas, transporte público ou veículos elétricos.</li>
                <li>Plantar árvores e proteger áreas verdes.</li>
                <li>Participar de iniciativas e movimentos que promovam a conscientização ambiental.</li>
            </ul>

            <h2>Acordos e iniciativas globais</h2>
            <p>
                O Acordo de Paris, assinado em 2015, é um dos marcos mais importantes no combate às mudanças 
                climáticas. Ele estabelece metas para limitar o aquecimento global a menos de 2°C em relação 
                aos níveis pré-industriais e incentiva os países a reduzir suas emissões de gases de efeito 
                estufa. Além disso, iniciativas como a Convenção-Quadro das Nações Unidas sobre Mudança do 
                Clima (UNFCCC) ajudam a coordenar ações globais para enfrentar essa crise.
            </p>
        </div>
    </section>
    `;
  }
}
customElements.define("actions-component", ActionsComponent);
