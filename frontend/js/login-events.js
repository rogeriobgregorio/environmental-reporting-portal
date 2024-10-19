const showToast = (message, type) => {
  const toastContainer = document.createElement("div");
  toastContainer.className = `toast ${type}`;
  toastContainer.innerText = message;

  document.body.appendChild(toastContainer);

  setTimeout(() => {
    toastContainer.classList.add("fade-out");
    setTimeout(() => {
      toastContainer.remove();
    }, 500);
  }, 3500);
};

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
      showToast("Login realizado com sucesso!", "success");
      form.reset();
    } else {
      showToast("Erro ao realizar login. Verifique suas credenciais.", "error");
    }
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    showToast("Ocorreu um erro ao realizar o login.", "error");
  }
};

export const togglePasswordVisibility = (toggleElement, passwordInput) => {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  const icon = toggleElement.querySelector("i");
  icon.classList.toggle("fa-eye"); 
  icon.classList.toggle("fa-eye-slash"); 
};
