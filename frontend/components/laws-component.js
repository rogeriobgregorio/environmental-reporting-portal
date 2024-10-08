class LawsComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <section class="leis-ambientais">
        <div class="container">
            <h1>Leis Ambientais no Brasil</h1>
            <p">
                O Brasil possui um vasto conjunto de leis que visam proteger o meio ambiente e promover o desenvolvimento sustentável. Entender essas leis é essencial para saber como proteger a natureza e garantir que os recursos naturais sejam preservados para as futuras gerações.
            </p>

            <h2>1. Constituição Federal de 1988</h2>
            <p>
                A Constituição Brasileira de 1988 inclui um capítulo específico sobre meio ambiente, que estabelece o direito de todos a um ambiente ecologicamente equilibrado e impõe ao poder público e à sociedade o dever de defendê-lo e preservá-lo para as futuras gerações.
            </p>

            <h2>2. Lei de Crimes Ambientais (Lei nº 9.605/1998)</h2>
            <p>
                A Lei de Crimes Ambientais é uma das mais importantes no Brasil. Ela estabelece sanções para condutas e atividades que prejudicam o meio ambiente, como desmatamento, poluição e maus-tratos a animais. As punições variam de multas a penas de prisão, dependendo da gravidade da infração.
            </p>

            <h2>3. Código Florestal (Lei nº 12.651/2012)</h2>
            <p>
                O Código Florestal regula o uso das terras no Brasil, protegendo áreas de vegetação nativa e impondo restrições ao desmatamento. Ele define Áreas de Preservação Permanente (APPs) e as Reservas Legais, essenciais para a manutenção da biodiversidade e do equilíbrio ecológico.
            </p>

            <h2>4. Política Nacional de Resíduos Sólidos (Lei nº 12.305/2010)</h2>
            <p>
                A Política Nacional de Resíduos Sólidos promove a redução, o reaproveitamento e a reciclagem de resíduos. Ela também responsabiliza empresas e consumidores pelo destino final adequado dos resíduos e incentiva a logística reversa, principalmente em produtos como eletrônicos e embalagens.
            </p>

            <h2>5. Lei da Mata Atlântica (Lei nº 11.428/2006)</h2>
            <p>
                Essa lei protege o bioma Mata Atlântica, impondo restrições severas ao desmatamento e à exploração de áreas cobertas por essa vegetação. Ela define critérios para a exploração econômica sustentável e busca preservar esse importante patrimônio natural.
            </p>

            <h2>6. Sistema Nacional de Unidades de Conservação (Lei nº 9.985/2000)</h2>
            <p>
                Essa lei cria o Sistema Nacional de Unidades de Conservação (SNUC), que visa a proteção de áreas de grande importância ecológica. As Unidades de Conservação incluem parques nacionais, reservas biológicas e estações ecológicas, entre outras, onde a preservação ambiental é prioritária.
            </p>

            <h2>7. Lei de Proteção da Fauna (Lei nº 5.197/1967)</h2>
            <p>
                A Lei de Proteção da Fauna proíbe a caça e captura de animais silvestres sem a devida autorização e protege espécies ameaçadas de extinção. Ela é uma das principais ferramentas para a proteção da fauna nativa do Brasil.
            </p>
        </div>
    </section>
    `;
  }
}
customElements.define("laws-component", LawsComponent);
