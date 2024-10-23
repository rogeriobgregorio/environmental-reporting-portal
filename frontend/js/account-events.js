let userId; 

export const validatePassword = (password) => {
  const lengthRequirement = document.getElementById("length");
  const uppercaseRequirement = document.getElementById("uppercase");
  const lowercaseRequirement = document.getElementById("lowercase");
  const numberRequirement = document.getElementById("number");
  const specialRequirement = document.getElementById("special");

  lengthRequirement.classList.toggle("valid", password.length >= 8);
  lengthRequirement.classList.toggle("invalid", password.length < 8);

  uppercaseRequirement.classList.toggle("valid", /[A-Z]/.test(password));
  uppercaseRequirement.classList.toggle("invalid", !/[A-Z]/.test(password));

  lowercaseRequirement.classList.toggle("valid", /[a-z]/.test(password));
  lowercaseRequirement.classList.toggle("invalid", !/[a-z]/.test(password));

  numberRequirement.classList.toggle("valid", /\d/.test(password));
  numberRequirement.classList.toggle("invalid", !/\d/.test(password));

  specialRequirement.classList.toggle("valid", /[@#$!%*?&]/.test(password));
  specialRequirement.classList.toggle("invalid", !/[@#$!%*?&]/.test(password));
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
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");

    nameInput.value = userData.name;
    emailInput.value = userData.email;
  } catch (error) {
    console.error("Erro ao buscar perfil do usuário:", error);
  }
}

export const handleUpdateSubmit = async (event) => {
  event.preventDefault();

  const form = event.target;
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    showToast(
      "Token JWT não encontrado. Por favor, faça login novamente.",
      "error"
    );
    return;
  }

  const formData = {
    name: form.name.value,
    email: form.email.value,
  };

  if (form.password.value) {
    formData.password = form.password.value;
  }

  showToast("Atualizando..");

  try {
    const response = await fetch(
      `http://127.0.0.1:8080/api/v1/users/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      showToast("Atualização realizada com sucesso!", "success");
      form.reset();
    } else {
      showToast("Erro ao atualizar usuário. Tente novamente.", "error");
    }
  } catch (error) {
    console.error("Erro ao realizar atualização:", error);
    showToast(
      "Ocorreu um erro ao realizar a atualização. Verifique seus dados.",
      "error"
    );
  }
};

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
  }, 3000);
};
document.addEventListener("DOMContentLoaded", initAccount);
