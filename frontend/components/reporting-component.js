import { attachReportEventListeners } from "../js/reporting-events.js";

class ReportingComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="report" class="report-section">
        <h2>Criar Denúncia</h2>
        <h3>Insira as informações acerca da denúncia</h3>
        <form id="reportForm" class="report-form">

          <div class="form-group">
            <label for="location">Local:</label>
            <input type="text" id="location" name="location" required>
          </div>

          <div class="form-group">
            <label for="reportType">Tipo da Denúncia:</label>
            <select id="reportType" name="reportType" required>
              <option value="AIR_POLLUTION">Poluição do Ar</option>
              <option value="ANIMAL_ABUSE">Maus-tratos de Animais</option>
              <option value="DEFORESTATION">Desmatamento</option>
              <option value="GREEN_AREA_INVASION">Invasão de área verde</option>
              <option value="ILLEGAL_DRAINAGE">Drenagem ilegal</option>
              <option value="ILLEGAL_FENCING">Cercamento ilegal</option>
              <option value="ILLEGAL_HUNTING">Caça ilegal</option>
              <option value="ILLEGAL_MINING">Mineração ilegal</option>
              <option value="ILLEGAL_PRUNING">Poda ilegal</option>
              <option value="ILLEGAL_TREE_REMOVAL">Remoção ilegal de árvores</option>
              <option value="ILLEGAL_WASTE_DISPOSAL">Descarte ilegal de resíduos</option>
              <option value="SOIL_CONTAMINATION">Contaminação do solo</option>
              <option value="WATER_CONTAMINATION">Contaminação da água</option>
              <option value="ECOLOGICAL_IMBALANCE">Desequilibrio ecológico</option>
              <option value="WILDFIRE">Incêndio florestal</option>
              <option value="">OTHER</option>
            </select>
          </div>

          <div class="form-group">
            <label for="severityLevel">Nível de Severidade:</label>
            <select id="severityLevel" name="severityLevel" required>
              <option value="VERY_LOW">Muito Baixo</option>
              <option value="LOW">Baixo</option>
              <option value="MEDIUM">Médio</option>
              <option value="HIGH">Alto</option>
              <option value="VERY_HIGH">Muito Alto</option>
            </select>
          </div>

          <div class="form-group">
            <label for="description">Descrição:</label>
            <textarea id="description" name="description" required></textarea>
          </div>

          <div class="form-group">
            <label for="images">Imagens:</label>
            <input type="file" id="images" name="images" multiple accept="image/*">
          </div>

          <button type="submit" class="submit-btn">Enviar Denúncia</button>
        </form>
      </section>
    `;

    attachReportEventListeners(this);
  }
}
customElements.define("reporting-component", ReportingComponent);
