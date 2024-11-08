export async function fetchReports() {
  const token = localStorage.getItem("jwtToken");
  try {
    const response = await fetch("http://127.0.0.1:8080/api/v1/reports", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Erro ao buscar denúncias.");
    }
  } catch (error) {
    console.error("Erro ao buscar denúncias:", error);
    return [];
  }
}

export function renderReportCard(report) {
  const images =
    report.imageURLs.length > 0
      ? report.imageURLs
          .map(
            (url, index) =>
              `<img src="${url}" class="carousel-image ${
                index === 0 ? "active" : ""
              }" />`
          )
          .join("")
      : "<p>Sem imagens</p>";

  return `
    <div class="card">
      <h3>${report.author.name}</h3>
      <p><strong>Localização:</strong> ${report.location}</p>
      <p><strong>Data/Hora:</strong> ${new Date(
        report.timeStamp
      ).toLocaleString()}</p>
      <p><strong>Tipo:</strong> ${report.reportType}</p>
      <p><strong>Severidade:</strong> ${report.severityLevel}</p>
      <p><strong>Status:</strong> ${report.reportStatus}</p>
      <p>${report.description}</p>
      <div class="carousel">
        ${images}
      </div>
    </div>
  `;
}
