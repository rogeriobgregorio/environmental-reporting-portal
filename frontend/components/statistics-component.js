import {
  fetchReports,
  generateTypeChart,
  generateStatusChart,
  generateSeverityChart,
} from "../js/statistics-events.js";

class StatisticsComponent extends HTMLElement {
  async connectedCallback() {
    this.innerHTML = `
      <section id="statistics" class="statistics">
        <h2>Estatísticas</h2>
        <canvas id="typeChart"></canvas>
        <canvas id="statusChart"></canvas>
        <canvas id="severityChart"></canvas>
      </section>
    `;

    // Recuperar os dados dos reports
    const reports = await fetchReports();

    // Gerar os gráficos com os dados dos reports
    generateTypeChart(reports);
    generateStatusChart(reports);
    generateSeverityChart(reports);
  }
}
customElements.define("statistics-component", StatisticsComponent);
