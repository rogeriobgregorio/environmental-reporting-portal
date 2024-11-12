import { fetchReports, renderReportCard } from "../js/reports-events.js";

class ReportsComponent extends HTMLElement {
  async connectedCallback() {
    const token = localStorage.getItem("jwtToken");
    const role = token ? parseJwt(token).role : null;
    const reports = await fetchReports();

    this.innerHTML = `
      <section id="denuncias" class="reports">
        <h2>Denúncias</h2>
        <div class="cards">
          ${reports.map((report) => renderReportCard(report, role)).join("")}
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
