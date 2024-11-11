export const initializeHeroEvents = () => {
  const reportButton = document.getElementById("cta-btn-report");

  reportButton.addEventListener("click", (event) => {
    event.preventDefault();

    const token = localStorage.getItem("jwtToken");
    if (token) {
      window.location.href =
        "http://127.0.0.1:5500/environmental-reporting-portal/frontend/reporting.html";
    } else {
      window.location.href =
        "http://127.0.0.1:5500/environmental-reporting-portal/frontend/login.html";
    }
  });
};
