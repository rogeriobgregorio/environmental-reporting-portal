export const validateForm = (data) => {
  if (data.name.trim() === "") {
    showToast("Por favor, preencha o nome.", "error");
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(data.email)) {
    showToast("Por favor, insira um email válido.", "error");
    return false;
  }

  if (data.content.trim().length < 10) {
    showToast("A mensagem deve ter pelo menos 10 caracteres.", "error");
    return false;
  }

  return true;
};

export const handleSubmit = async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = {
    name: form.name.value,
    email: form.email.value,
    content: form.message.value,
  };

  if (!validateForm(formData)) {
    return;
  }

  showToast("Enviando mensagem...");

  try {
    const response = await fetch("http://127.0.0.1:8080/api/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      showToast("Mensagem enviada com sucesso!", "success");
      form.reset();
    } else {
      showToast("Erro ao enviar a mensagem. Tente novamente.", "error");
    }
  } catch (error) {
    console.error("Erro ao enviar a mensagem:", error);
    showToast("Ocorreu um erro ao enviar a mensagem.", "error");
  }
};

function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500); 
}
