class ConsumptionComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <section class="consumo-consciente">
            <div class="container">
                <h1>Consumo Consciente</h1>
                <p>
                    O consumo consciente é fundamental para minimizar os impactos ambientais e promover um estilo de vida sustentável.
                    Ao escolher produtos que respeitam o meio ambiente e as comunidades locais, cada um de nós pode contribuir 
                    significativamente para a preservação do planeta. Vamos juntos explorar práticas que podem transformar nossa 
                    forma de consumir e impactar positivamente o mundo ao nosso redor.
                </p>

                <h2>1. Prefira produtos locais</h2>
                <p>
                    Apoiar a economia local comprando de produtores e empresas da sua região é uma maneira poderosa de fortalecer sua comunidade. 
                    Além de reduzir o impacto do transporte de mercadorias, você promove a criação de empregos locais e incentiva a 
                    preservação das tradições culturais. Ao escolher produtos frescos e sazonais, você também contribui para uma alimentação mais saudável e sustentável.
                </p>
                <p>
                    <strong>Dica:</strong> Visite feiras de agricultores ou mercados locais para descobrir produtos frescos e de 
                    qualidade, além de interagir com quem os produz.
                </p>

                <h2>2. Avalie a necessidade do produto</h2>
                <p>
                    Antes de fazer uma compra, é essencial refletir se você realmente precisa do item. Pergunte-se: "Essa compra é
                    realmente necessária ou estou apenas reagindo a uma promoção?" Essa prática ajuda a evitar compras por impulso 
                    e a acumular objetos que muitas vezes acabam esquecidos. Optar por menos pode resultar em uma vida mais simples e significativa.
                </p>
                <p>
                    <strong>Dica:</strong> Experimente a regra de 30 dias. Se você ainda estiver pensando em um produto após esse período, 
                    talvez seja um sinal de que realmente precisa dele.
                </p>

                <h2>3. Escolha marcas sustentáveis</h2>
                <p>
                    Pesquise e escolha marcas que adotam práticas sustentáveis em sua produção, embalagem e logística. Isso inclui
                    empresas que utilizam materiais recicláveis, técnicas de produção que minimizam o desperdício e que se 
                    comprometem com a transparência nas suas operações. Ao apoiar essas marcas, você ajuda a criar uma demanda 
                    por produtos que respeitam o meio ambiente.
                </p>
                <p>
                    <strong>Dica:</strong> Consulte certificações como o selo "Fair Trade", "Orgânico" ou "Selo Verde" para identificar
                    empresas que se preocupam com a sustentabilidade.
                </p>

                <h2>4. Reduza, reutilize e recicle</h2>
                <p>
                    Uma das melhores maneiras de consumir de forma consciente é seguir os princípios dos 3 Rs: Reduzir, Reutilizar e 
                    Reciclar. Reduza a quantidade de produtos que você compra, reutilize itens sempre que possível e, por fim, 
                    recicle o que não pode ser mais usado. Essas práticas não apenas diminuem o volume de resíduos, mas também economizam recursos naturais.
                </p>

                <h2>5. Considere o ciclo de vida do produto</h2>
                <p>
                    Pense no ciclo de vida do produto que você está prestes a comprar. Desde a produção até o descarte, quais são os 
                    impactos ambientais? Optar por produtos duráveis e reparáveis, em vez de descartáveis, pode fazer uma grande diferença.
                    Além disso, escolha itens que possam ser facilmente reciclados ao fim de sua vida útil.
                </p>

                <h2>6. Eduque-se e compartilhe conhecimento</h2>
                <p>
                    O consumo consciente é uma jornada que se enriquece com a informação. Procure aprender mais sobre sustentabilidade, 
                    impactos ambientais e consumo responsável. Compartilhe o que você aprendeu com amigos e familiares, criando uma rede 
                    de conscientização em sua comunidade.
                </p>
            </div>
        </section>
    `;
  }
}
customElements.define("consumption-component", ConsumptionComponent);
