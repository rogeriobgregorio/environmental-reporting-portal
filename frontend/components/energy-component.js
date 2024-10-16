class EnergyComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <section class="energias-renovaveis">
        <div class="container">
            <h1>Energias Renováveis</h1>
            <p>
                As energias renováveis são essenciais para um futuro sustentável, pois reduzem a dependência de 
                combustíveis fósseis e diminuem as emissões de gases de efeito estufa. Investir em fontes de 
                energia limpa não só protege o meio ambiente, mas também pode trazer benefícios econômicos e sociais 
                a longo prazo. Vamos explorar as principais fontes renováveis e entender como elas contribuem 
                para um planeta mais verde.
            </p>

            <h2>1. Energia solar</h2>
            <p>
                A energia solar é uma das fontes mais promissoras, aproveitando a luz do sol para gerar eletricidade
                 por meio de painéis solares fotovoltaicos. Ela pode ser utilizada tanto em residências quanto em 
                 empresas, sendo uma solução acessível e com grande potencial de expansão.
            </p>
            <p>
                <strong>Benefícios:</strong> A energia solar é abundante e renovável, disponível em praticamente todas 
                as regiões do planeta. Reduz significativamente as contas de eletricidade e tem baixa manutenção 
                após a instalação dos painéis.
            </p>
            <p>
                <strong>Dica:</strong> Verifique incentivos governamentais e programas de financiamento para a 
                instalação de sistemas solares em sua casa ou empresa.
            </p>

            <h2>2. Energia eólica</h2>
            <p>
                Turbinas eólicas convertem a energia do vento em eletricidade, sendo uma opção limpa e eficiente para 
                gerar energia em larga escala. Regiões com ventos constantes e fortes são ideais para o desenvolvimento 
                de parques eólicos, contribuindo de forma significativa para a matriz energética global.
            </p>
            <p>
                <strong>Benefícios:</strong> A energia eólica é uma fonte inesgotável, e as turbinas modernas têm se 
                tornado mais eficientes, gerando grandes quantidades de eletricidade com impacto ambiental mínimo.
            </p>
            <p>
                <strong>Dica:</strong> Se você mora em uma área com ventos constantes, considere o uso de pequenas 
                turbinas eólicas para complementar sua energia elétrica doméstica.
            </p>

            <h2>3. Biomassa</h2>
            <p>
                A biomassa utiliza matéria orgânica, como resíduos agrícolas, florestais e resíduos urbanos, para a produção 
                de energia. É uma alternativa que não só ajuda a reduzir resíduos, mas também aproveita materiais que, 
                de outra forma, seriam descartados.
            </p>
            <p>
                <strong>Benefícios:</strong> A energia gerada pela biomassa é considerada neutra em carbono, pois o CO2
                 liberado durante sua queima é compensado pelo CO2 que as plantas absorvem durante seu crescimento. 
                 Além disso, a biomassa contribui para a redução de resíduos orgânicos em aterros sanitários.
            </p>
            <p>
                <strong>Dica:</strong> Informe-se sobre os programas de biogás na sua região, que podem transformar 
                resíduos orgânicos em energia para comunidades rurais e urbanas.
            </p>

            <h2>4. Energia hidrelétrica</h2>
            <p>
                A energia hidrelétrica aproveita a força da água em movimento, como rios e cachoeiras, para gerar eletricidade. 
                Embora seja amplamente utilizada em diversas partes do mundo, ela requer grandes infraestruturas e pode ter 
                impactos ambientais se não for gerida adequadamente.
            </p>
            <p>
                <strong>Benefícios:</strong> É uma fonte confiável e estável de energia, especialmente em regiões com grandes corpos de água.
                 Em termos de emissão de gases de efeito estufa, a energia hidrelétrica é muito mais limpa do que as usinas movidas a combustíveis fósseis.
            </p>
            <p>
                <strong>Dica:</strong> Apoie iniciativas locais que promovem o uso sustentável da água e buscam minimizar os 
                impactos ambientais de grandes barragens.
            </p>

            <h2>5. Geotermia</h2>
            <p>
                A energia geotérmica utiliza o calor proveniente do interior da Terra para gerar eletricidade e aquecer edifícios.
                 É uma opção menos conhecida, mas altamente eficiente em locais com atividade geotérmica, como áreas vulcânicas.
            </p>
            <p>
                <strong>Benefícios:</strong> A energia geotérmica oferece uma fonte de energia constante e confiável, com emissões muito baixas. 
                É particularmente útil para aquecimento residencial e industrial em regiões com recursos geotérmicos.
            </p>
            <p>
                <strong>Dica:</strong> Se você vive em uma área com recursos geotérmicos, explore a possibilidade de usar sistemas
                 de aquecimento geotérmico em sua residência.
            </p>

        </div>
    </section>
    `;
  }
}
customElements.define("energy-component", EnergyComponent);
