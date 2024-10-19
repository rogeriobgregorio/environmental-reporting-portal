export const validateRegisterForm = (data) => {
  if (data.name.trim() === "") {
    showToast("Por favor, preencha o nome.");
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(data.email)) {
    showToast("Por favor, insira um email válido.");
    return false;
  }

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordPattern.test(data.password)) {
    showToast(
      "A senha deve conter pelo menos 8 caracteres, incluindo 1 letra maiúscula, 1 minúscula, 1 número e 1 caractere especial."
    );
    return false;
  }

  return true;
};

export const handleRegisterSubmit = async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = {
    name: form.name.value,
    email: form.email.value,
    password: form.password.value,
  };

  if (!validateRegisterForm(formData)) {
    return;
  }

  showToast("Cadastrando...");

  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      showToast("Cadastro realizado com sucesso!");
      form.reset();
    } else {
      showToast("Erro ao realizar cadastro. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro ao realizar cadastro:", error);
    showToast("Ocorreu um erro ao realizar o cadastro.");
  }
};
