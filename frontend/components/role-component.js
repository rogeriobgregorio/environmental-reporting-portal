import { attachEventListeners } from "../js/role-events.js";

class RoleComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="account" class="account-section">
        <h2>Editar permissões</h2>
        <h3>Insira o email do usuário para alterar autorização ou banir</h3>

        <form id="accountForm" class="account-form">

          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
          </div>

          <div class="form-group">
            <label for="role">Selecione a autorização:</label>
            <select id="role" name="role" required>
              <option value="USER">Usuário comum</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>

          <button type="submit" class="submit-btn">Alterar autorização</button>
          <button type="button" class="delete-btn">Banir usuário</button>

          <a href="./admin.html" class="profile-link" id="profileLink">Voltar para o perfil administrador</a>
        </form>

        <div id="deleteModal" class="modal hidden">
          <div class="modal-content">
            <h3>Você tem certeza que deseja banir esse usuário?</h3>
            <button id="confirmDelete" class="confirm-btn">Banir</button>
            <button id="cancelDelete" class="cancel-btn">Cancelar</button>
          </div>
        </div>
      </section>
    `;

    attachEventListeners(this);
  }
}
customElements.define("role-component", RoleComponent);
