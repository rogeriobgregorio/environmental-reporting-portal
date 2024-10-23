import {
  handleUpdateSubmit, 
  validatePassword,
  toggleAnonymous,
  togglePasswordVisibility,
} from "../js/account-events.js";

class AccountComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<section id="account" class="account-section">
        <h2>Editar perfil</h2>
        <h3>Por favor, insira os dados que deseja atualizar</h3>
        
        <form id="accountForm" class="account-form">
          <div class="custom-checkbox-group">
            <label class="custom-checkbox-label">
              <input type="checkbox" id="anonymousCheckbox">
              <span>Quero me manter como usuário anônimo</span>
            </label>
          </div>

          <div class="form-group">
            <label for="name">Nome:</label>
            <input type="text" id="name" name="name" required>
          </div>
          
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
          </div>
          
          <div class="form-group password-group">
            <label for="password">Nova senha:</label>
            <input type="password" id="password" name="password"> <!-- Removido o required aqui -->
            <span id="togglePassword" class="toggle-password" role="button" tabindex="0">
              <i class="far fa-eye"></i>
            </span>
            <ul id="passwordRequirements" class="password-requirements hidden">
              <h4>Para maior segurança a senha deve conter:</h4>
              <li id="length" class="invalid">Mínimo de 8 caracteres</li>
              <li id="uppercase" class="invalid">Pelo menos 1 letra maiúscula</li>
              <li id="lowercase" class="invalid">Pelo menos 1 letra minúscula</li>
              <li id="number" class="invalid">Pelo menos 1 número</li>
              <li id="special" class="invalid">Pelo menos 1 caractere especial (@, #, $, !, %, *, ?, &)</li>
            </ul>
          </div>
          
          <button type="submit" class="submit-btn">Atualizar</button>

          <a href="./profile.html" class="profile-link">Voltar para o perfil de usuário</a>
        </form>
      </section>`;

    this.initEventListeners();
  }

  initEventListeners() {
    const passwordInput = this.querySelector("#password");
    const passwordRequirements = this.querySelector("#passwordRequirements");
    const togglePassword = this.querySelector("#togglePassword");
    const submitButton = this.querySelector(".submit-btn");

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

    const anonymousCheckbox = this.querySelector("#anonymousCheckbox");
    anonymousCheckbox.addEventListener("change", toggleAnonymous);

    const form = this.querySelector("#accountForm");
    form.addEventListener("submit", handleUpdateSubmit);

    togglePassword.addEventListener("click", () => {
      togglePasswordVisibility(togglePassword, passwordInput);
    });
  }
}
customElements.define("account-component", AccountComponent);
