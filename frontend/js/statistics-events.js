
// Função para buscar os reports e processar os dados para os gráficos
export async function fetchReports() {
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

// Função para gerar o gráfico de Tipos de Denúncias
export function generateTypeChart(reports) {
  const reportTypes = {
    AIR_POLLUTION: 0,
    ANIMAL_ABUSE: 0,
    DEFORESTATION: 0,
    GREEN_AREA_INVASION: 0,
    ILLEGAL_DRAINAGE: 0,
    ILLEGAL_FENCING: 0,
    ILLEGAL_HUNTING: 0,
    ILLEGAL_MINING: 0,
    ILLEGAL_PRUNING: 0,
    ILLEGAL_TREE_REMOVAL: 0,
    ILLEGAL_WASTE_DISPOSAL: 0,
    SOIL_CONTAMINATION: 0,
    WATER_CONTAMINATION: 0,
    ECOLOGICAL_IMBALANCE: 0,
    WILDFIRE: 0,
    OTHER: 0,
  };

  reports.forEach((report) => {
    if (report.reportType) {
      reportTypes[report.reportType]++;
    }
  });

  const ctx = document.getElementById("typeChart").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(reportTypes).map((type) => translateReportType(type)),
      datasets: [
        {
          label: "Quantidade de Denúncias por Tipo",
          data: Object.values(reportTypes),
          backgroundColor: Object.keys(reportTypes).map(
            (type) => typeColors[type] || "rgba(0, 0, 0, 0.6)"
          ), 
          borderColor: Object.keys(reportTypes).map(
            (type) => typeColors[type] || "rgba(0, 0, 0, 1)"
          ),
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            font: {
              size: 18,
            },
          },
        },
        tooltip: {
          bodyFont: {
            size: 18, // Aumenta o tamanho da fonte do tooltip
          },
        },
      },
      scale: {
        ticks: { beginAtZero: true },
      },
    },
  });
}


// Função para gerar o gráfico de Status das Denúncias
export function generateStatusChart(reports) {
  const statusCount = {
    PENDING: 0,
    UNDER_REVIEW: 0,
    VERIFIED: 0,
    ACTION_TAKEN: 0,
    RESOLVED: 0,
    REJECTED: 0,
  };

  reports.forEach((report) => {
    if (report.reportStatus) {
      statusCount[report.reportStatus]++;
    }
  });

  const ctx = document.getElementById("statusChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(statusCount).map((status) => translateStatus(status)),
      datasets: [
        {
          label: "Status das Denúncias",
          data: Object.values(statusCount),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 205, 86, 1)",
            "rgba(54, 162, 235, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            font: {
              size: 18, // Aumenta o tamanho da fonte da legenda
            },
          },
        },
        tooltip: {
          bodyFont: {
            size: 18, // Aumenta o tamanho da fonte do tooltip
          },
        },
      },
      scales: {
        y: {
          ticks: {
            beginAtZero: true,
            stepSize: 1,
            font: {
              size: 18, // Aumenta o tamanho da fonte dos rótulos do eixo Y
            },
          },
        },
        x: {
          ticks: {
            font: {
              size: 18, // Aumenta o tamanho da fonte dos rótulos do eixo X
            },
          },
        },
      },
    },
  });
}

// Função para gerar o gráfico de Severidade das Denúncias
export function generateSeverityChart(reports) {
  const severityCount = {
    VERY_LOW: 0,
    LOW: 0,
    MEDIUM: 0,
    HIGH: 0,
    VERY_HIGH: 0,
  };

  reports.forEach((report) => {
    if (report.severityLevel) {
      severityCount[report.severityLevel]++;
    }
  });

  const ctx = document.getElementById("severityChart").getContext("2d");
  new Chart(ctx, {
    type: "radar",
    data: {
      labels: Object.keys(severityCount).map((severity) =>
        translateSeverity(severity)
      ),
      datasets: [
        {
          label: "Distribuição de Severidade das Denúncias",
          data: Object.values(severityCount),
          fill: true,
          backgroundColor: "rgba(255, 159, 64, 0.2)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            font: {
              size: 18, // Aumenta o tamanho da fonte da legenda
            },
          },
        },
        tooltip: {
          bodyFont: {
            size: 18, // Aumenta o tamanho da fonte do tooltip
          },
        },
      },
      scales: {
        r: {
          ticks: {
            beginAtZero: true,
            stepSize: 1,
            precision: 0,
            font: {
              size: 18, // Aumenta o tamanho da fonte dos rótulos dos eixos
            },
          },
          angleLines: {
            display: true,
            lineWidth: 1,
          },
          grid: {
            circular: false,
          },
          pointLabels: {
            font: {
              size: 18, // Aumenta o tamanho da fonte dos rótulos ao redor do gráfico (os pontos)
            },
          },
        },
      },
    },
  });
}

// Função para traduzir os tipos de denúncia
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
    WILDFIRE: "Queimada ilegal",
    OTHER: "Outro",
  }[type] || type);

// Função para traduzir os status das denúncias
const translateStatus = (status) =>
  ({
    PENDING: "Pendente",
    UNDER_REVIEW: "Em análise",
    VERIFIED: "Verificado",
    ACTION_TAKEN: "Ação tomada",
    RESOLVED: "Resolvido",
    REJECTED: "Rejeitado",
  }[status] || status);

// Função para traduzir os níveis de severidade
const translateSeverity = (severity) =>
  ({
    VERY_LOW: "Muito baixo",
    LOW: "Baixo",
    MEDIUM: "Médio",
    HIGH: "Alto",
    VERY_HIGH: "Muito alto",
  }[severity] || severity);

const typeColors = {
  AIR_POLLUTION: "rgba(255, 66, 182, 1.0)", // Cor para Poluição do ar
  ANIMAL_ABUSE: "rgba(0, 123, 255, 1.0)", // Cor para Maus-tratos a animais (azul)
  DEFORESTATION: "rgba(255, 159, 64, 0.6)", // Cor para Desmatamento (laranja)
  GREEN_AREA_INVASION: "rgba(0, 255, 0, 0.6)", // Cor para Invasão de área verde (verde)
  ILLEGAL_DRAINAGE: "rgba(54, 162, 235, 0.3)", // Cor para Drenagem ilegal (azul claro)
  ILLEGAL_FENCING: "rgba(255, 205, 86, 0.6)", // Cor para Cercamento ilegal (amarelo)
  ILLEGAL_HUNTING: "rgba(102, 51, 153, 0.6)", // Cor para Caça ilegal (roxo)
  ILLEGAL_MINING: "rgba(255, 69, 0, 0.6)", // Cor para Mineração ilegal (vermelho escuro)
  ILLEGAL_PRUNING: "rgba(255, 105, 180, 0.8)", // Cor para Poda ilegal (rosa)
  ILLEGAL_TREE_REMOVAL: "rgba(34, 139, 34, 0.6)", // Cor para Remoção ilegal de árvores (verde escuro)
  ILLEGAL_WASTE_DISPOSAL: "rgba(255, 99, 71, 0.6)", // Cor para Descarte ilegal de resíduos (tomato)
  SOIL_CONTAMINATION: "rgba(139, 69, 19, 0.6)", // Cor para Contaminação do solo (marrom)
  WATER_CONTAMINATION: "rgba(30, 144, 255, 0.6)", // Cor para Contaminação da água (azul escuro)
  ECOLOGICAL_IMBALANCE: "rgba(255, 20, 147, 0.2)", // Cor para Desequilíbrio ecológico (deep pink)
  WILDFIRE: "rgba(255, 69, 0, 1.0)", // Cor para Queimada ilegal (vermelho)
  OTHER: "rgba(255, 255, 0, 0.6)", // Cor para Outro (amarelo claro)
};

