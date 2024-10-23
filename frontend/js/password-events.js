export const handlePasswordSubmit = async (event) => {
  event.preventDefault();

  const form = event.target;
  const email = form.email.value;

  if (!validateEmail(email)) {
    showToast("Por favor, insira um email válido.", "error");
    return;
  }

  showToast("Enviando solicitação...");

  try {
    const response = await fetch(
      "http://127.0.0.1:8080/api/v1/mail/recover-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (response.ok) {
      showToast("Solicitação enviada com sucesso! Verifique sua caixa de entrada.", "success");
      form.reset();
    } else {
      showToast("Erro ao enviar email. Tente novamente.", "error");
    }
  } catch (error) {
    console.error("Erro ao enviar o email:", error);
    showToast("Ocorreu um erro ao enviar a solicitação.", "error");
  }
};

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}
