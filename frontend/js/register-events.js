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

export const handleRegisterSubmit = async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = {
    name: form.name.value,
    email: form.email.value,
    password: form.password.value,
  };

  showToast("Cadastrando...");

  try {
    const response = await fetch(
      "http://127.0.0.1:8080/api/v1/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      showToast("Cadastro realizado com sucesso!", "success");
      form.reset();
    } else {
      showToast("Erro ao realizar cadastro. Tente novamente.", "error");
    }
  } catch (error) {
    console.error("Erro ao realizar cadastro:", error);
    showToast(
      "Ocorreu um erro ao realizar o cadastro. Verifique seus dados.",
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

export const initEventListeners = (component) => {
  const passwordInput = component.querySelector("#password");
  const passwordRequirements = component.querySelector("#passwordRequirements");
  const togglePassword = component.querySelector("#togglePassword");
  const submitButton = component.querySelector(".submit-btn");

  passwordInput.addEventListener("focus", () => {
    passwordRequirements.classList.remove("hidden");
  });

  passwordInput.addEventListener("blur", (event) => {
    if (event.relatedTarget !== submitButton) {
      passwordRequirements.classList.add("hidden");
    }
  });

  passwordInput.addEventListener("input", () => {
    validatePassword(passwordInput.value);
  });

  const anonymousCheckbox = component.querySelector("#anonymousCheckbox");
  anonymousCheckbox.addEventListener("change", toggleAnonymous);

  const form = component.querySelector("#registerForm");
  form.addEventListener("submit", handleRegisterSubmit);

  togglePassword.addEventListener("click", () => {
    togglePasswordVisibility(togglePassword, passwordInput);
  });
};
