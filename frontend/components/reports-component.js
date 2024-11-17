import {
  fetchReports,
  renderReportCard,
  showCommentsModal,
} from "../js/reports-events.js";

class ReportsComponent extends HTMLElement {
  async connectedCallback() {
    const token = localStorage.getItem("jwtToken");
    const role = token ? parseJwt(token).role : null;
    const reports = await fetchReports();

    const reportsHtml = reports.length
      ? reports.map((report) => renderReportCard(report, role)).join("")
      : `
        <div class="all-reports-list">
          <div class="no-reports">
            <i class="fa-regular fa-folder-open"></i>
            Nenhuma denúncia para exibir.
          </div>
        </div>
      `;

    this.innerHTML = `
      <section id="denuncias" class="reports">
        <h2>Denúncias</h2>
        <div class="cards">
          ${reportsHtml}
        </div>
      </section>
    `;
  }
}

function parseJwt(token) {
  const base64Payload = token.split(".")[1];
  const jsonPayload = atob(base64Payload);
  return JSON.parse(jsonPayload);
}
customElements.define("reports-component", ReportsComponent);
