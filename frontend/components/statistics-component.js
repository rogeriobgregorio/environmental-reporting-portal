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
        <h3>Veja a situação atual das denúncias recebidas em nossa plataforma</h3>
        <canvas id="typeChart"></canvas>
        <canvas id="statusChart"></canvas>
        <canvas id="severityChart"></canvas>
      </section>
    `;

    const reports = await fetchReports();

    generateTypeChart(reports);
    generateStatusChart(reports);
    generateSeverityChart(reports);
  }
}
customElements.define("statistics-component", StatisticsComponent);
