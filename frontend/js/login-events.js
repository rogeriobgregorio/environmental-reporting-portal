export const handleLoginSubmit = async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = {
    email: form.email.value,
    password: form.password.value,
  };

  showToast("Entrando...");

  try {
    const response = await fetch("http://localhost:8080/api/v1/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("jwtToken", data.token);
      showToast("Login realizado com sucesso!");
      form.reset();
    } else {
      showToast("Erro ao realizar login. Verifique suas credenciais.");
    }
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    showToast("Ocorreu um erro ao realizar o login.");
  }
};
