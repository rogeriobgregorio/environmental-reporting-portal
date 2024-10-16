class BiodiversityComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <section class="preservacao-biodiversidade">
            <div class="container">
                <h1>Preservação da Biodiversidade</h1>
                <p>
                    A biodiversidade é a variedade de vida na Terra, e sua preservação é crucial para manter o equilíbrio 
                    dos ecossistemas, garantir a resiliência natural contra mudanças climáticas e assegurar a qualidade 
                    de vida para todas as espécies, incluindo os seres humanos. A perda de biodiversidade impacta 
                    diretamente os serviços ecossistêmicos, como a purificação da água, a polinização e a regulação do clima. 
                    Vamos explorar como podemos contribuir para a proteção da biodiversidade.
                </p>

                <h2>1. Preserve os habitats naturais</h2>
                <p>
                    A destruição de habitats, como florestas, savanas, oceanos e áreas úmidas, ameaça a sobrevivência de inúmeras espécies. 
                    Ao evitar práticas que contribuam para o desmatamento, poluição e urbanização descontrolada, você pode ajudar a proteger esses ambientes. 
                </p>
                <p>
                    <strong>Dica:</strong> Apoie iniciativas de reflorestamento, evite produtos que contribuem para o desmatamento 
                    e promova a proteção de áreas naturais em sua comunidade.
                </p>

                <h2>2. Proteja espécies ameaçadas</h2>
                <p>
                    Muitas espécies estão à beira da extinção devido à perda de habitat, caça ilegal e mudanças climáticas. 
                    Informe-se sobre as espécies ameaçadas em sua região e apoie projetos que promovem sua proteção e recuperação. 
                    Espécies-chave, como polinizadores (abelhas e borboletas) e predadores de topo (como grandes felinos), 
                    desempenham papéis fundamentais na manutenção do equilíbrio dos ecossistemas.
                </p>
                <p>
                    <strong>Dica:</strong> Participe de campanhas de conscientização, apoie reservas e santuários de vida 
                    selvagem e evite produtos que envolvam caça ou captura ilegal de animais.
                </p>

                <h2>3. Participe de iniciativas locais</h2>
                <p>
                    Engajar-se em ações locais é uma maneira poderosa de fazer a diferença. Muitos grupos comunitários e 
                    ONGs estão focados na conservação da biodiversidade, organizando atividades como plantio de árvores, 
                    limpeza de praias e programas de educação ambiental. 
                </p>
                <p>
                    <strong>Dica:</strong> Procure grupos em sua região que realizam ações de preservação da biodiversidade. 
                    Além de participar de eventos, você pode atuar como voluntário em programas de monitoramento de fauna e flora.
                </p>

                <h2>4. Consuma de forma sustentável</h2>
                <p>
                    O consumo sustentável é uma maneira prática de ajudar a preservar a biodiversidade. Produtos oriundos 
                    de práticas agrícolas ou pesqueiras insustentáveis podem levar à degradação de habitats naturais e 
                    extinção de espécies. Optar por produtos com certificações de sustentabilidade e evitar o desperdício 
                    são atitudes que fazem a diferença.
                </p>
                <p>
                    <strong>Dica:</strong> Procure produtos com selos de certificação ambiental, como o FSC (Forest Stewardship Council) 
                    para produtos de madeira e o MSC (Marine Stewardship Council) para frutos do mar, garantindo que os recursos naturais 
                    sejam manejados de forma responsável.
                </p>

                <h2>5. Apoie a educação ambiental</h2>
                <p>
                    A educação é uma ferramenta poderosa para promover a conservação da biodiversidade. Ensinar as futuras gerações 
                    sobre a importância dos ecossistemas e como proteger o meio ambiente pode garantir um futuro mais sustentável.
                </p>
                <p>
                    <strong>Dica:</strong> Envolva-se em programas de educação ambiental, participando ou organizando palestras, 
                    workshops e atividades ao ar livre que ensinem sobre a biodiversidade local e global.
                </p>

            </div>
        </section>
    `;
  }
}
customElements.define("biodiversity-component", BiodiversityComponent);
