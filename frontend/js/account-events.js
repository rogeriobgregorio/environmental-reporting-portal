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
  const updatedUserData = {
    name: form.name.value,
    email: form.email.value,
    password: form.password.value || undefined, 
  };

  try {
    const response = await fetch(
      `http://127.0.0.1:8080/api/v1/users/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUserData),
      }
    );

    if (response.ok) {
      showToast("Perfil atualizado com sucesso!");
      initAccount(); 
    } else {
      showToast(
        "Erro ao atualizar perfil. Verifique os dados e tente novamente."
      );
    }
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      showToast("Conta deletada com sucesso!");
      localStorage.removeItem("jwtToken");
      window.location.href = "./index.html"; 
    } else {
      showToast("Erro ao deletar conta. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro ao deletar conta:", error);
  }
};
window.addEventListener("load", initAccount);
