let userId;

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

export const validatePassword = (password) => {
  const lengthRequirement = document.getElementById("length");
  const uppercaseRequirement = document.getElementById("uppercase");
  const lowercaseRequirement = document.getElementById("lowercase");
  const numberRequirement = document.getElementById("number");
  const specialRequirement = document.getElementById("special");

  lengthRequirement.classList.toggle("valid", password.length >= 8);
  uppercaseRequirement.classList.toggle("valid", /[A-Z]/.test(password));
  lowercaseRequirement.classList.toggle("valid", /[a-z]/.test(password));
  numberRequirement.classList.toggle("valid", /\d/.test(password));
  specialRequirement.classList.toggle("valid", /[@#$!%*?&]/.test(password));
};

export const toggleAnonymous = () => {
  const nameInput = document.getElementById("name");
  const isChecked = document.getElementById("anonymousCheckbox").checked;

  if (isChecked) {
    nameInput.value = "Usuário Anônimo";
    nameInput.disabled = true;
  } else {
    nameInput.value = "";
    nameInput.disabled = false;
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

export const initAccount = () => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    console.error("Token JWT não encontrado no localStorage.");
    return;
  }

  const payload = parseJwt(token);
  userId = payload.id;

  const profileLink = document.getElementById("profileLink");
  profileLink.textContent =
    payload.role === "ROLE_ADMIN"
      ? "Voltar ao perfil administrador"
      : "Voltar ao perfil de usuário";
  profileLink.setAttribute(
    "href",
    payload.role === "ROLE_ADMIN" ? "./admin.html" : "./profile.html"
  );

  fetchUserProfile(userId, token);
};

function parseJwt(token) {
  const base64Payload = token.split(".")[1];
  const jsonPayload = atob(base64Payload);
  return JSON.parse(jsonPayload);
}

async function fetchUserProfile(userId, token) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8080/api/v1/users/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.ok) {
      const userData = await response.json();
      document.getElementById("name").value = userData.name;
      document.getElementById("email").value = userData.email;
    } else {
      console.error("Erro ao buscar perfil do usuário.");
    }
  } catch (error) {
    console.error("Erro ao buscar perfil do usuário:", error);
  }
}

export const handleUpdateSubmit = async (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  const updatedUserData = { name, email };
  if (password) updatedUserData.password = password;

  try {
    const response = await fetch(
      `http://127.0.0.1:8080/api/v1/users/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify(updatedUserData),
      }
    );

    if (response.ok) showToast("Perfil atualizado com sucesso!");
    else showToast("Erro ao atualizar perfil.", "error");
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
  }
};

export const handleDeleteAccount = async () => {
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await fetch(
      `http://127.0.0.1:8080/api/v1/users/${userId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.ok) {
      localStorage.removeItem("jwtToken");
      showToast("Conta deletada com sucesso.");
      window.location.href = "./login.html";
    } else {
      showToast("Erro ao deletar conta.", "error");
    }
  } catch (error) {
    console.error("Erro ao deletar conta:", error);
  }
};

export const attachEventListeners = (component) => {
  const passwordInput = component.querySelector("#password");
  const passwordRequirements = component.querySelector("#passwordRequirements");
  const togglePassword = component.querySelector("#togglePassword");
  const submitButton = component.querySelector(".submit-btn");
  const deleteButton = component.querySelector(".delete-btn");
  const modal = component.querySelector("#deleteModal");
  const confirmDeleteButton = component.querySelector("#confirmDelete");
  const cancelDeleteButton = component.querySelector("#cancelDelete");

  passwordInput.addEventListener("focus", () =>
    passwordRequirements.classList.remove("hidden")
  );
  passwordInput.addEventListener("blur", (event) => {
    if (event.relatedTarget !== submitButton)
      passwordRequirements.classList.add("hidden");
  });
  passwordInput.addEventListener("input", () =>
    validatePassword(passwordInput.value)
  );

  const anonymousCheckbox = component.querySelector("#anonymousCheckbox");
  anonymousCheckbox.addEventListener("change", toggleAnonymous);

  const form = component.querySelector("#accountForm");
  form.addEventListener("submit", handleUpdateSubmit);

  togglePassword.addEventListener("click", () =>
    togglePasswordVisibility(togglePassword, passwordInput)
  );

  deleteButton.addEventListener("click", () =>
    modal.classList.remove("hidden")
  );
  cancelDeleteButton.addEventListener("click", () =>
    modal.classList.add("hidden")
  );
  confirmDeleteButton.addEventListener("click", async () => {
    await handleDeleteAccount();
    modal.classList.add("hidden");
  });
};
