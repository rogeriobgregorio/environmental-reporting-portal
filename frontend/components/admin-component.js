import {
  initAdminProfile,
  initEditProfileButton,
  initMessagesButton,
} from "../js/admin-events.js";

class AdminComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="admin-profile">
        <div class="profile-header">
          <div class="profile-info">
            <i class="fa-solid fa-user-shield profile-icon"></i>
            <h2 class="admin-username"></h2>
            <button class="edit-profile-btn" id="editProfileBtn">Editar Perfil</button>
            <button class="messages-btn" id="messagesBtn">Mensagens</button>
          </div>
        </div>

        <div class="admin-counters">
          <div class="counter">
            <i class="fa-solid fa-exclamation-triangle"></i>
            <span class="open-reports">Denúncias pendentes: <span class="count">0</span></span>
          </div>
          <div class="counter">
            <i class="fa-solid fa-check-circle"></i>
            <span class="resolved-reports">Denúncias resolvidas: <span class="count">0</span></span>
          </div>
        </div>

        <div class="all-reports-list">
          <div class="no-reports">
            <i class="fa-regular fa-folder-open"></i>
            Nenhuma denúncia para exibir.
          </div>
        </div>
      </section>
    `;

    initAdminProfile(this);
    initEditProfileButton(this);
    initMessagesButton(this); 
  }
}
customElements.define("admin-component", AdminComponent);
