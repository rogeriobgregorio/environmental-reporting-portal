import { initProfile } from "../js/profile-events.js";

class ProfileComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = ` 
      <section class="profile">
        <div class="profile-header">
          <div class="profile-info">
            <i class="fa-solid fa-circle-user user-profile-icon"></i>
            <h2 class="username"></h2>
            <button class="edit-profile-btn" id="editProfileBtn">Editar perfil</button>
            <button class="reporting-btn" id="reportingBtn">Criar denúncia</button>
          </div>
        </div>

        <div class="counters">
          <div class="counter">
            <i class="fa-solid fa-exclamation-triangle"></i>
            <span class="open-reports">Denúncias abertas: <span class="count">0</span></span>
          </div>

          <div class="counter">
            <i class="fa-solid fa-check-circle"></i>
            <span class="resolved-reports">Denúncias concluídas: <span class="count">0</span></span>
          </div>
        </div>

        <div class="report-list">
          <div class="no-reports">
            <i class="fa-regular fa-folder-open"></i> 
            Você ainda não fez nenhuma denúncia
          </div>
        </div>
      </section>
    `;

    initProfile(this);
  }
}
customElements.define("profile-component", ProfileComponent);
