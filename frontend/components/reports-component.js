import { fetchReports, renderReportCard } from "../js/reports-events.js";

class ReportsComponent extends HTMLElement {
  async connectedCallback() {
    const reports = await fetchReports();
    this.innerHTML = `
      <section id="denuncias" class="reports">
        <h2>Denúncias</h2>
        <div class="cards">
          ${reports.map((report) => renderReportCard(report)).join("")}
        </div>
      </section>
    `;
  }
}
customElements.define("reports-component", ReportsComponent);
