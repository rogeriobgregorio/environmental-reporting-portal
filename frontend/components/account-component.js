import {
  handleUpdateSubmit,
  validatePassword,
  toggleAnonymous,
  togglePasswordVisibility,
  handleDeleteAccount,
  initAccount, // Import necessário para verificar e configurar o profile-link
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
            <input type="password" id="password" name="password">
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
          <button type="button" class="delete-btn">Deletar conta</button>

          <a href="#" class="profile-link" id="profileLink">Voltar para o perfil</a>
        </form>

        <div id="deleteModal" class="modal hidden">
          <div class="modal-content">
            <h3>Você tem certeza que deseja deletar sua conta?</h3>
            <button id="confirmDelete" class="confirm-btn">Deletar</button>
            <button id="cancelDelete" class="cancel-btn">Cancelar</button>
          </div>
        </div>
      </section>`;

    this.initEventListeners();
    initAccount(); // Chama initAccount para configurar o profile-link com base na role
  }

  initEventListeners() {
    const passwordInput = this.querySelector("#password");
    const passwordRequirements = this.querySelector("#passwordRequirements");
    const togglePassword = this.querySelector("#togglePassword");
    const submitButton = this.querySelector(".submit-btn");
    const deleteButton = this.querySelector(".delete-btn");
    const modal = this.querySelector("#deleteModal");
    const confirmDeleteButton = this.querySelector("#confirmDelete");
    const cancelDeleteButton = this.querySelector("#cancelDelete");

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

    deleteButton.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });

    cancelDeleteButton.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    confirmDeleteButton.addEventListener("click", async () => {
      await handleDeleteAccount();
      modal.classList.add("hidden");
    });
  }
}

customElements.define("account-component", AccountComponent);
