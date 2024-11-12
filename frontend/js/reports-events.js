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
    : "ver mais";
}

window.toggleExpand = toggleExpand;

export function renderReportCard(report, role) {
  function parseJwt(token) {
    const base64Payload = token.split(".")[1];
    const jsonPayload = atob(base64Payload);
    return JSON.parse(jsonPayload);
  }

  const token = localStorage.getItem("jwtToken");
  const userId = token ? parseJwt(token).id : null;

  const canDelete =
    role === "ROLE_ADMIN" ||
    (role === "ROLE_USER" &&
      report.reportStatus === "PENDING" &&
      report.author.id === userId);

  const trashIcon = canDelete
    ? `<i class="fa-solid fa-trash-can delete-icon" onclick="showDeleteModal('${report.id}')"></i>`
    : "";

  const image =
    report.imageURLs.length > 0
      ? `<img src="${report.imageURLs[0]}" class="carousel-image" />`
      : "<p>Sem imagens</p>";

  const locationText = report.location.length >= 100 ? "show" : "";
  const descriptionText = report.description.length >= 100 ? "show" : "";

  return `
    <div class="card">
      <div class="card-header">
        <i class="fa-solid fa-circle-user profile-icon"></i>
        <h3>${report.author.name}</h3>
        <span class="timestamp">${new Date(
          report.timeStamp
        ).toLocaleString()}</span>
        ${trashIcon}
      </div>

      <div class="card-info">
        <p><strong>Tipo:</strong> ${translateReportType(report.reportType)}</p>
        <p><strong>Gravidade:</strong> ${translateSeverity(
          report.severityLevel
        )}</p>
        <p><strong>Status:</strong> ${translateStatus(report.reportStatus)}</p>
      </div>

      <p><strong>Localização:</strong>
        <span class="expandable-text">${report.location}</span>
        <span class="read-more ${locationText}" onclick="toggleExpand(this.previousElementSibling)">ver mais</span>
      </p>

      <p><strong>Descrição:</strong>
        <span class="expandable-text">${report.description}</span>
        <span class="read-more ${descriptionText}" onclick="toggleExpand(this.previousElementSibling)">ver mais</span>
      </p>

      <div class="image-container">
        ${image}
      </div>
    </div>
  `;
}

// Função para exibir o modal de confirmação de exclusão
export function showDeleteModal(reportId, onDeleteCallback) {
  const modalHtml = `
    <div id="deleteModal" class="modal">
      <div class="modal-content">
        <h3>Você tem certeza que deseja deletar esta denúncia?</h3>
        <button id="confirmDelete" class="modal-button delete-button">Deletar</button>
        <button id="cancelDelete" class="modal-button cancel-button">Cancelar</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);
  const modal = document.getElementById("deleteModal");

  document.getElementById("cancelDelete").onclick = () => closeModal(modal);
  document.getElementById("confirmDelete").onclick = async () => {
    const success = await deleteReport(reportId);
    closeModal(modal);
    if (success) {
      showToast("Denúncia deletada com sucesso.", "success");
      if (onDeleteCallback) onDeleteCallback();
    } else {
      showToast("Erro ao deletar a denúncia.", "error");
    }
  };

  function closeModal(modalElement) {
    modalElement.remove();
  }
}

// Função para deletar a denúncia
async function deleteReport(reportId) {
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await fetch(`http://127.0.0.1:8080/api/v1/reports/${reportId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error("Erro ao deletar a denúncia.");
    }
  } catch (error) {
    console.error("Erro ao deletar a denúncia:", error);
    return false;
  }
}

// Função para exibir os toasts de confirmação e erro
function showToast(message, type) {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
window.showDeleteModal = showDeleteModal;