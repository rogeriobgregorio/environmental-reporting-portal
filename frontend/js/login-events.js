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

const decodeToken = (token) => {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
};

export const handleLoginSubmit = async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = {
    email: form.email.value,
    password: form.password.value,
  };

  try {
    const response = await fetch("http://127.0.0.1:8080/api/v1/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();

      console.log("Token recebido do servidor:", data.token);

      localStorage.clear();
      localStorage.setItem("jwtToken", data.token);
      console.log("Novo token armazenado:", localStorage.getItem("jwtToken"));

      const decodedToken = decodeToken(data.token);
      const role = decodedToken.role;

      if (role === "ROLE_ADMIN") {
        window.location.href =
          "http://127.0.0.1:5500/environmental-reporting-portal/frontend/admin.html";
      } else {
        window.location.href =
          "http://127.0.0.1:5500/environmental-reporting-portal/frontend/profile.html";
      }
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

window.addEventListener("DOMContentLoaded", () => {
  localStorage.clear();
});
