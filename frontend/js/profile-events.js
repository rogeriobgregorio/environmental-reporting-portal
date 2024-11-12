import { renderReportCard } from "../js/reports-events.js";

export function initProfile(element) {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    console.error("Token JWT não encontrado no localStorage.");
    return;
  }

  const payload = parseJwt(token);
  const userId = payload.id;

  fetchUserProfile(userId, token, element, () => {
    fetchUserReports(userId, token, element);
  });

  initEventListeners(element);
}

function parseJwt(token) {
  const base64Payload = token.split(".")[1];
  const jsonPayload = atob(base64Payload);
  return JSON.parse(jsonPayload);
}

async function fetchUserProfile(userId, token, element, callback) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8080/api/v1/users/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Erro ao buscar perfil do usuário.");
      return;
    }

    const userData = await response.json();
    const usernameElement = element.querySelector(".username");
    usernameElement.textContent = userData.name;

    callback();
  } catch (error) {
    console.error("Erro ao buscar perfil do usuário:", error);
  }
}

async function fetchUserReports(userId, token, element) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8080/api/v1/reports/search/author/id/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar denúncias do usuário");
    }

    const reportsData = await response.json();

    const openReportsCount = reportsData.length;

    const resolvedReportsCount = reportsData.filter(
      (report) => report.reportStatus === "RESOLVED"
    ).length;

    const openReportsElement = element.querySelector(".open-reports .count");
    const resolvedReportsElement = element.querySelector(
      ".resolved-reports .count"
    );

    openReportsElement.textContent = openReportsCount;
    resolvedReportsElement.textContent = resolvedReportsCount;

    const reportListElement = element.querySelector(".report-list");
    if (reportsData.length > 0) {
      const token = localStorage.getItem("jwtToken");
      const role = parseJwt(token).role;
      reportListElement.innerHTML = reportsData
        .map((report) => renderReportCard(report, role))
        .join("");
    } else {
      reportListElement.innerHTML = `
        <div class="no-reports">
          <i class="fa-regular fa-folder-open"></i> Você ainda não fez nenhuma denúncia
        </div>
      `;
    }
  } catch (error) {
    console.error("Erro ao buscar denúncias do usuário:", error);
  }
}

export function initEventListeners(element) {
  const editProfileBtn = element.querySelector("#editProfileBtn");
  editProfileBtn.addEventListener("click", () => {
    window.location.href =
      "http://127.0.0.1:5500/environmental-reporting-portal/frontend/account.html";
  });

  const reportingBtn = element.querySelector("#reportingBtn");
  reportingBtn.addEventListener("click", () => {
    window.location.href =
      "http://127.0.0.1:5500/environmental-reporting-portal/frontend/reporting.html";
  });
}
