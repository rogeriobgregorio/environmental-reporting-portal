export const showToast = (message, type = "success") => {
  const toast = document.createElement("div");
  toast.classList.add("toast", type);
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("fade-out");
    toast.addEventListener("transitionend", () => {
      toast.remove();
    });
  }, 3000);
};

export const attachReportEventListeners = (component) => {
  const form = component.querySelector("#reportForm");
  form.addEventListener("submit", handleReportSubmit);
};

export const handleReportSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append("authorId", localStorage.getItem("userId")); 
  formData.append(
    "description",
    document.querySelector("#description").value.trim()
  );
  formData.append("location", document.querySelector("#location").value.trim());
  formData.append(
    "severityLevel",
    document.querySelector("#severityLevel").value
  );
  formData.append("reportType", document.querySelector("#reportType").value);

  const images = document.querySelector("#images").files;
  for (let i = 0; i < images.length; i++) {
    formData.append("images", images[i]);
  }

  try {
    const response = await fetch("http://127.0.0.1:8080/api/v1/reports", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
      body: formData,
    });

    if (response.ok) {
      showToast("Denúncia criada com sucesso!", "success");
    } else {
      showToast("Erro ao criar denúncia.", "error");
    }
  } catch (error) {
    console.error("Erro ao enviar denúncia:", error);
    showToast("Erro ao enviar denúncia.", "error");
  }
};
