export async function fetchReports() {
  const token = localStorage.getItem("jwtToken");
  try {
    const response = await fetch("http://127.0.0.1:8080/api/v1/reports", {
      method: "GET",
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

const translateReportType = (type) =>
  ({
    AIR_POLLUTION: "Poluição do ar",
    ANIMAL_ABUSE: "Maus-tratos a animais",
    DEFORESTATION: "Desmatamento",
    GREEN_AREA_INVASION: "Invasão de área verde",
    ILLEGAL_DRAINAGE: "Drenagem ilegal",
    ILLEGAL_FENCING: "Cercamento ilegal",
    ILLEGAL_HUNTING: "Caça ilegal",
    ILLEGAL_MINING: "Mineração ilegal",
    ILLEGAL_PRUNING: "Poda ilegal",
    ILLEGAL_TREE_REMOVAL: "Remoção ilegal de árvores",
    ILLEGAL_WASTE_DISPOSAL: "Descarte ilegal de resíduos",
    SOIL_CONTAMINATION: "Contaminação do solo",
    WATER_CONTAMINATION: "Contaminação da água",
    ECOLOGICAL_IMBALANCE: "Desequilíbrio ecológico",
    WILDFIRE: "Incêndio florestal",
    OTHER: "Outros",
  }[type] || type);

const translateSeverity = (severity) =>
  ({
    VERY_LOW: "Muito baixo",
    LOW: "Baixo",
    MEDIUM: "Médio",
    HIGH: "Alto",
    VERY_HIGH: "Muito alto",
  }[severity] || severity);

const translateStatus = (status) =>
  ({
    PENDING: "Pendente",
    UNDER_REVIEW: "Em análise",
    VERIFIED: "Verificado",
    ACTION_TAKEN: "Ação tomada",
    RESOLVED: "Resolvido",
    REJECTED: "Rejeitado",
  }[status] || status);

function toggleExpand(element) {
  element.classList.toggle("expanded");
  element.nextElementSibling.textContent = element.classList.contains(
    "expanded"
  )
    ? "ver menos"
    : "continuar lendo";
}

window.toggleExpand = toggleExpand;

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
          .join(" ")
      : "<p>Sem imagens</p>";

  const locationText = report.location.length >= 100 ? "show" : ""; 
  const descriptionText = report.description.length >= 100 ? "show" : ""; 

  return `
    <div class="card">
      <div class="card-header">
        <i class="fa-solid fa-circle-user profile-icon"></i>
        <h3>${report.author.name}</h3>
        <span>${new Date(report.timeStamp).toLocaleString()}</span>
        <i class="fa-solid fa-ellipsis"></i>
      </div>

      <div class="card-info">
        <p><strong>Tipo:</strong> ${translateReportType(report.reportType)}</p>
        <p><strong>Severidade:</strong> ${translateSeverity(
          report.severityLevel
        )}</p>
        <p><strong>Status:</strong> ${translateStatus(report.reportStatus)}</p>
      </div>

      <p><strong>Localização:</strong>
        <span class="expandable-text">${report.location}</span>
        <span class="read-more ${locationText}" onclick="toggleExpand(this.previousElementSibling)">continuar lendo</span>
      </p>

      <p><strong>Descrição:</strong>
        <span class="expandable-text">${report.description}</span>
        <span class="read-more ${descriptionText}" onclick="toggleExpand(this.previousElementSibling)">continuar lendo</span>
      </p>

      <div class="carousel">
        ${images}
      </div>
    </div>
  `;
}

