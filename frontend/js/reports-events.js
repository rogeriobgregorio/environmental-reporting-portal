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

  function parseJwt(token) {
    const base64Payload = token.split(".")[1];
    const jsonPayload = atob(base64Payload);
    return JSON.parse(jsonPayload);
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
    OTHER: "Outro",
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
  const token = localStorage.getItem("jwtToken");
  const userId = token ? parseJwt(token).id : null;

  const canEditAndDelete =
    role === "ROLE_ADMIN" ||
    (role === "ROLE_USER" &&
      report.reportStatus === "PENDING" &&
      report.author.id === userId);

  const editIcon = canEditAndDelete
    ? `<i class="fa-solid fa-pen-to-square edit-icon" onclick="showEditModal('${report.id}')"></i>`
    : "";

  const trashIcon = canEditAndDelete
    ? `<i class="fa-solid fa-trash delete-icon" onclick="showDeleteModal('${report.id}')"></i>`
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
        <div class="action-icons">
          ${editIcon}
          ${trashIcon}
        </div>
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
      <button class="comments-button" onclick="showCommentsModal(${JSON.stringify(
        report
      ).replace(/"/g, "&quot;")})">Ler comentários</button>
    </div>
  `;
}

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

async function deleteReport(reportId) {
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await fetch(
      `http://127.0.0.1:8080/api/v1/reports/${reportId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      location.reload();
      return true;
    } else {
      throw new Error("Erro ao deletar a denúncia.");
    }
  } catch (error) {
    console.error("Erro ao deletar a denúncia:", error);
    return false;
  }
}

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

export function showEditModal(reportId) {
  const token = localStorage.getItem("jwtToken");
  const role = token ? parseJwt(token).role : null;

  const modalHtml = `
    <div id="editModal" class="edit-modal">
      <div class="edit-modal-content">
        <h2>Editar Denúncia</h2>
        <h3>Altere as informações acerca da denúncia</h3>
        <form id="editForm" class="edit-report-form">
          <div class="edit-form-group">
            <label for="location">Local:</label>
            <input type="text" id="editLocation" name="location" required>
          </div>
          <div class="edit-form-group">
            <label for="reportType">Tipo da Denúncia:</label>
            <select id="editReportType" name="reportType" required>
              <option value="AIR_POLLUTION">Poluição do Ar</option>
              <option value="ANIMAL_ABUSE">Maus-tratos de Animais</option>
              <option value="DEFORESTATION">Desmatamento</option>
              <option value="GREEN_AREA_INVASION">Invasão de área verde</option>
              <option value="ILLEGAL_DRAINAGE">Drenagem ilegal</option>
              <option value="ILLEGAL_FENCING">Cercamento ilegal</option>
              <option value="ILLEGAL_HUNTING">Caça ilegal</option>
              <option value="ILLEGAL_MINING">Mineração ilegal</option>
              <option value="ILLEGAL_PRUNING">Poda ilegal</option>
              <option value="ILLEGAL_TREE_REMOVAL">Remoção ilegal de árvores</option>
              <option value="ILLEGAL_WASTE_DISPOSAL">Descarte ilegal de resíduos</option>
              <option value="SOIL_CONTAMINATION">Contaminação do solo</option>
              <option value="WATER_CONTAMINATION">Contaminação da água</option>
              <option value="ECOLOGICAL_IMBALANCE">Desequilíbrio ecológico</option>
              <option value="WILDFIRE">Queimada ilegal</option>
              <option value="OTHER">Outro</option>
            </select>
          </div>
          <div class="edit-form-group">
            <label for="severityLevel">Nível de Severidade:</label>
            <select id="editSeverityLevel" name="severityLevel" required>
              <option value="VERY_LOW">Muito Baixo</option>
              <option value="LOW">Baixo</option>
              <option value="MEDIUM">Médio</option>
              <option value="HIGH">Alto</option>
              <option value="VERY_HIGH">Muito Alto</option>
            </select>
          </div>
          <div class="edit-form-group">
            <label for="description">Descrição:</label>
            <textarea id="editDescription" name="description" required></textarea>
          </div>
          ${
            role === "ROLE_ADMIN"
              ? `<div class="edit-form-group">
                  <label for="status">Status da Denúncia:</label>
                  <select id="editStatus" name="status" required>
                    <option value="1">Pendente</option>
                    <option value="2">Em Análise</option>
                    <option value="3">Verificado</option>
                    <option value="4">Ação Tomada</option>
                    <option value="5">Resolvido</option>
                    <option value="6">Rejeitado</option>
                  </select>
                </div>`
              : ""
          }
          <button type="submit" class="edit-submit-btn">Salvar Alterações</button>
          <button type="button" class="edit-modal-button edit-cancel-button" onclick="closeEditModal()">Cancelar</button>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);

  fetchReportDetails(reportId);

  document.getElementById("editForm").onsubmit = (e) =>
    submitEditForm(e, reportId);
}

async function fetchReportDetails(reportId) {
  const token = localStorage.getItem("jwtToken");
  try {
    const response = await fetch(
      `http://127.0.0.1:8080/api/v1/reports/${reportId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const report = await response.json();
      document.getElementById("editLocation").value = report.location;
      document.getElementById("editReportType").value = report.reportType;
      document.getElementById("editSeverityLevel").value = report.severityLevel;
      document.getElementById("editDescription").value = report.description;

      const statusSelect = document.getElementById("editStatus");
      if (statusSelect) {
        const statusMap = {
          PENDING: 1,
          UNDER_REVIEW: 2,
          VERIFIED: 3,
          ACTION_TAKEN: 4,
          RESOLVED: 5,
          REJECTED: 6,
        };
        statusSelect.value = statusMap[report.reportStatus];
      }
    } else {
      throw new Error("Erro ao buscar detalhes da denúncia.");
    }
  } catch (error) {
    console.error("Erro ao buscar detalhes da denúncia:", error);
  }
}

async function submitEditForm(event, reportId) {
  event.preventDefault();
  const token = localStorage.getItem("jwtToken");

  const updatedData = {
    location: document.getElementById("editLocation").value,
    reportType: document.getElementById("editReportType").value,
    severityLevel: document.getElementById("editSeverityLevel").value,
    description: document.getElementById("editDescription").value,
  };

  const role = parseJwt(token).role;
  if (role === "ROLE_ADMIN") {
    const status = document.getElementById("editStatus").value;
    try {
      await fetch(`http://127.0.0.1:8080/api/v1/reports/${reportId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(parseInt(status)),
      });
    } catch (error) {
      console.error("Erro ao atualizar o status da denúncia:", error);
      showToast("Erro ao atualizar o status da denúncia.", "error");
      return;
    }
  }

  try {
    const response = await fetch(
      `http://127.0.0.1:8080/api/v1/reports/${reportId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (response.ok) {
      location.reload();
      closeEditModal();
    } else {
      throw new Error("Erro ao atualizar a denúncia.");
    }
  } catch (error) {
    console.error("Erro ao atualizar a denúncia:", error);
    showToast("Erro ao atualizar a denúncia.", "error");
  }
}

function closeEditModal() {
  const modal = document.getElementById("editModal");
  if (modal) modal.remove();
}


// Função para abrir o modal com os comentários
export function showCommentsModal(report) {
  const comments = report.comments;
  const modalHtml = `
    <div id="commentsModal" class="modal">
      <div class="modal-content">
        <h3>Comentários</h3>
        <div id="commentsList">
          ${
            comments.length
              ? comments
                  .map(
                    (comment) => `
                    <div class="comment">
                      <p><strong>${comment.author.name}:</strong> ${
                      comment.content
                    }</p>
                      <span class="timestamp">${new Date(
                        comment.timestamp
                      ).toLocaleString()}</span>
                    </div>
                  `
                  )
                  .join("")
              : "<p>Seja o primeiro a comentar</p>"
          }
        </div>
        <form id="commentForm">
          <textarea id="commentContent" placeholder="Digite seu comentário..." required></textarea>
          <button type="submit" class="submit-comment-btn">Enviar</button>
        </form>
        <button id="closeModalBtn" class="modal-button close-button">Fechar</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);
  const modal = document.getElementById("commentsModal");

  // Fechar o modal
  document.getElementById("closeModalBtn").onclick = () => modal.remove();

  // Submeter o formulário
  document.getElementById("commentForm").onsubmit = (e) => {
    e.preventDefault();
    const content = document.getElementById("commentContent").value.trim();
    if (content) {
      submitComment(report.id, content);
    }
  };
}

async function submitComment(reportId, content) {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    alert("Você precisa estar logado para comentar.");
    return;
  }

  const authorId = parseJwt(token).id;

  const commentRequest = {
    authorId,
    reportId,
    content,
    timestamp: new Date().toISOString(),
  };

  try {
    const response = await fetch("http://127.0.0.1:8080/api/v1/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(commentRequest),
    });

    if (response.ok) {
      const newComment = await response.json();
      addCommentToModal(newComment);
      document.getElementById("commentContent").value = ""; // Limpar o campo de comentário
    } else {
      throw new Error("Erro ao criar comentário.");
    }
  } catch (error) {
    console.error("Erro ao criar comentário:", error);
    alert("Não foi possível enviar o comentário. Tente novamente.");
  }
}

export function addCommentToModal(comment) {
  const commentsList = document.getElementById("commentsList");
  const commentHtml = `
    <div class="comment">
      <p><strong>${comment.author.name}:</strong> ${comment.content}</p>
      <span class="timestamp">${new Date(
        comment.timestamp
      ).toLocaleString()}</span>
    </div>
  `;

  if (commentsList.querySelector("p")) {
    // Remove o texto "Seja o primeiro a comentar" se existir
    commentsList.innerHTML = "";
  }

  commentsList.insertAdjacentHTML("beforeend", commentHtml);
}

window.addCommentToModal = addCommentToModal;

window.showCommentsModal = showCommentsModal;
window.closeEditModal = closeEditModal;
window.showEditModal = showEditModal;