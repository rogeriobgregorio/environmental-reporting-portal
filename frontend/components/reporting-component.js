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
              <option value="1">Poluição do Ar</option>
              <option value="2">Maus-tratos de Animais</option>
              <option value="3">Desmatamento</option>
              <option value="4">Invasão de área verde</option>
              <option value="5">Drenagem ilegal</option>
              <option value="6">Cercamento ilegal</option>
              <option value="7">Caça ilegal</option>
              <option value="8">Mineração ilegal</option>
              <option value="9">Poda ilegal</option>
              <option value="10">Remoção ilegal de árvores</option>
              <option value="11">Descarte ilegal de resíduos</option>
              <option value="12">Contaminação do solo</option>
              <option value="13">Contaminação da água</option>
              <option value="14">Desequilibrio ecológico</option>
              <option value="15">Incêndio florestal</option>
              <option value="16">Outro</option>
            </select>
          </div>

          <div class="form-group">
            <label for="severityLevel">Nível de Severidade:</label>
            <select id="severityLevel" name="severityLevel" required>
              <option value="1">Muito Baixo</option>
              <option value="2">Baixo</option>
              <option value="3">Médio</option>
              <option value="4">Alto</option>
              <option value="5">Muito Alto</option>
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
