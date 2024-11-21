import { renderReportCard } from "../js/reports-events.js";

export function initAdminProfile(element) {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    console.error("Token JWT não encontrado no localStorage.");
    return;
  }

  const payload = parseJwt(token);
  const adminId = payload.id;

  fetchAdminProfile(adminId, token, element, () => {
    fetchAllReports(token, element);
  });
}

function parseJwt(token) {
  const base64Payload = token.split(".")[1];
  const jsonPayload = atob(base64Payload);
  return JSON.parse(jsonPayload);
}

async function fetchAdminProfile(adminId, token, element, callback) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8080/api/v1/users/${adminId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      console.error("Erro ao buscar perfil do administrador.");
      return;
    }

    const adminData = await response.json();
    const usernameElement = element.querySelector(".admin-username");
    usernameElement.textContent = adminData.name;

    callback();
  } catch (error) {
    console.error("Erro ao buscar perfil do administrador:", error);
  }
}

async function fetchAllReports(token, element) {
  try {
    const response = await fetch(`http://127.0.0.1:8080/api/v1/reports`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Erro ao buscar todas as denúncias");

    const reportsData = await response.json();

    const openReportsCount = reportsData.filter(
      (report) => report.reportStatus === "PENDING"
    ).length;
    const resolvedReportsCount = reportsData.filter(
      (report) => report.reportStatus === "RESOLVED"
    ).length;

    const openReportsElement = element.querySelector(".open-reports .count");
    const resolvedReportsElement = element.querySelector(
      ".resolved-reports .count"
    );
    openReportsElement.textContent = openReportsCount;
    resolvedReportsElement.textContent = resolvedReportsCount;

    const allReportsListElement = element.querySelector(".all-reports-list");
    if (reportsData.length > 0) {
      const token = localStorage.getItem("jwtToken");
      const role = parseJwt(token).role;
      allReportsListElement.innerHTML = reportsData
        .map((report) => renderReportCard(report, role))
        .reverse()
        .join("");
    } else {
      allReportsListElement.innerHTML = `
        <div class="no-reports">
          <i class="fa-regular fa-folder-open"></i> Nenhuma denúncia para exibir
        </div>
      `;
    }
  } catch (error) {
    console.error("Erro ao buscar todas as denúncias:", error);
  }
}

export function initEditProfileButton(element) {
  const editProfileBtn = element.querySelector("#editProfileBtn");
  editProfileBtn.addEventListener("click", () => {
    window.location.href =
      "http://127.0.0.1:5500/environmental-reporting-portal/frontend/account.html";
  });
}

export function initMessagesButton(element) {
  const messagesBtn = element.querySelector("#messagesBtn");
  messagesBtn.addEventListener("click", () => {
    window.location.href =
      "http://127.0.0.1:5500/environmental-reporting-portal/frontend/messages.html";
  });
}

export function initRoleButton(element) {
  const messagesBtn = element.querySelector("#roleBtn");
  messagesBtn.addEventListener("click", () => {
    window.location.href =
      "http://127.0.0.1:5500/environmental-reporting-portal/frontend/role.html";
  });
}
