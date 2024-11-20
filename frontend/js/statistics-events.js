
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

// Função para gerar o gráfico de Tipos de Denúncias (agora um gráfico de barras)
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
    type: "bar",
    data: {
      labels: Object.keys(reportTypes).map((type) => translateReportType(type)),
      datasets: [
        {
          label: "Quantidade de Denúncias por Tipo",
          data: Object.values(reportTypes),
          backgroundColor: Object.keys(reportTypes).map(
            (type) => typeColorsBar[type]
          ),
          borderColor: Object.keys(reportTypes).map(
            (type) => typeColorsBorder[type]
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
              family: "Roboto",
              weight: 700,
              color: "#000000",
            },
            boxWidth: 0,
          },
        },
        tooltip: {
          bodyFont: {
            size: 18,
            family: "Roboto",
            weight: 700,
            color: "#000000",
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              size: 18,
              family: "Roboto",
              weight: 700,
              color: "#000000",
            },
            stepSize: 1,
          },
        },
        x: {
          ticks: {
            font: {
              size: 18,
              family: "Roboto",
              weight: 700,
              color: "#000000",
            },
          },
        },
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
              size: 18,
              family: "Roboto",
              weight: 700,
              color: "#000000",
            },
            boxWidth: 0,
          },
        },
        tooltip: {
          bodyFont: {
            size: 18,
            family: "Roboto",
            weight: 700,
            color: "#000000",
          },
        },
      },
      scales: {
        y: {
          ticks: {
            beginAtZero: true,
            stepSize: 1,
            font: {
              size: 18,
              family: "Roboto",
              weight: 700,
              color: "#000000",
            },
          },
        },
        x: {
          ticks: {
            font: {
              size: 18,
              family: "Roboto",
              weight: 700,
              color: "#000000",
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

  const severityColorsBar = {
    VERY_LOW: "rgba(0, 0, 255, 0.2)",  
    LOW: "rgba(0, 255, 0, 0.2)",       
    MEDIUM: "rgba(255, 255, 0, 0.2)",  
    HIGH: "rgba(255, 165, 0, 0.2)",    
    VERY_HIGH: "rgba(255, 0, 0, 0.2)", 
  };

    const severityColorsBorder = {
      VERY_LOW: "rgba(0, 0, 255, 1)", 
      LOW: "rgba(0, 255, 0, 1)", 
      MEDIUM: "rgba(255, 255, 0, 1)", 
      HIGH: "rgba(255, 165, 0, 1)", 
      VERY_HIGH: "rgba(255, 0, 0, 1)", 
    };

  const ctx = document.getElementById("severityChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(severityCount).map((severity) =>
        translateSeverity(severity)
      ),
      datasets: [
        {
          label: "Distribuição de Severidade das Denúncias",
          data: Object.values(severityCount),
          backgroundColor: Object.keys(severityCount).map(
            (severity) => severityColorsBar[severity]
          ),
          borderColor: Object.keys(severityCount).map(
            (severity) => severityColorsBorder[severity]
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
              family: "Roboto",
              weight: 700,
              color: "#000000",
            },
            boxWidth: 0,
          },
        },
        tooltip: {
          bodyFont: {
            size: 18,
            family: "Roboto",
            weight: 700,
            color: "#000000",
          },
        },
      },
      scales: {
        y: {
          ticks: {
            beginAtZero: true,
            stepSize: 1,
            font: {
              size: 18,
              family: "Roboto",
              weight: 700,
              color: "#000000",
            },
          },
        },
        x: {
          ticks: {
            font: {
              size: 18,
              family: "Roboto",
              weight: 700,
              color: "#000000",
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

const typeColorsBar = {
  AIR_POLLUTION: "rgba(255, 66, 182, 0.2)",
  ANIMAL_ABUSE: "rgba(0, 123, 255, 0.2)",
  DEFORESTATION: "rgba(255, 159, 64, 0.2)",
  GREEN_AREA_INVASION: "rgba(0, 255, 0, 0.2)",
  ILLEGAL_DRAINAGE: "rgba(54, 162, 235, 0.2)",
  ILLEGAL_FENCING: "rgba(255, 205, 86, 0.2)",
  ILLEGAL_HUNTING: "rgba(102, 51, 153, 0.2)",
  ILLEGAL_MINING: "rgba(255, 69, 0, 0.2)",
  ILLEGAL_PRUNING: "rgba(255, 105, 180, 0.2)",
  ILLEGAL_TREE_REMOVAL: "rgba(34, 139, 34, 0.2)",
  ILLEGAL_WASTE_DISPOSAL: "rgba(255, 99, 71, 0.2)",
  SOIL_CONTAMINATION: "rgba(139, 69, 19, 0.2)",
  WATER_CONTAMINATION: "rgba(30, 144, 255, 0.2)",
  ECOLOGICAL_IMBALANCE: "rgba(255, 20, 147, 0.2)",
  WILDFIRE: "rgba(255, 69, 0, 0.2)",
  OTHER: "rgba(255, 255, 0, 0.2)",
};

const typeColorsBorder = {
  AIR_POLLUTION: "rgba(255, 66, 182, 1)",
  ANIMAL_ABUSE: "rgba(0, 123, 255, 1)",
  DEFORESTATION: "rgba(255, 159, 64, 1)",
  GREEN_AREA_INVASION: "rgba(0, 255, 0, 1)",
  ILLEGAL_DRAINAGE: "rgba(54, 162, 235, 1)",
  ILLEGAL_FENCING: "rgba(255, 205, 86, 1)",
  ILLEGAL_HUNTING: "rgba(102, 51, 153, 1)",
  ILLEGAL_MINING: "rgba(255, 69, 0, 1)",
  ILLEGAL_PRUNING: "rgba(255, 105, 180, 1)",
  ILLEGAL_TREE_REMOVAL: "rgba(34, 139, 34, 1)",
  ILLEGAL_WASTE_DISPOSAL: "rgba(255, 99, 71, 1)",
  SOIL_CONTAMINATION: "rgba(139, 69, 19, 1)",
  WATER_CONTAMINATION: "rgba(30, 144, 255, 1)",
  ECOLOGICAL_IMBALANCE: "rgba(255, 20, 147, 1)",
  WILDFIRE: "rgba(255, 69, 0, 1)",
  OTHER: "rgba(255, 255, 0, 1)",
};

