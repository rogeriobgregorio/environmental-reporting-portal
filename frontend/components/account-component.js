import {
  initAccount,
  attachEventListeners, 
} from "../js/account-events.js";

class AccountComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="account" class="account-section">
        <h2>Editar perfil</h2>
        <h3>Insira os dados que deseja atualizar</h3>

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
      </section>
    `;

    attachEventListeners(this);
    initAccount();
  }
}
customElements.define("account-component", AccountComponent);
