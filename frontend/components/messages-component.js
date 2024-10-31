import { setupMessagesEvents } from "../js/messages-events.js";

class MessagesComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="messages-container">
        <h1>Caixa de mensagens</h1>
        <div class="messages-layout">
          <div id="messagesList" class="messages-list"></div>
          <div id="messageDetails" class="message-details"></div>
        </div>

        <div id="deleteMessageModal" class="modal hidden">
          <div class="modal-content">
            <h3>Você tem certeza que deseja deletar esta mensagem?</h3>
            <button id="confirmDeleteMessage" class="confirm-btn">Deletar</button>
            <button id="cancelDeleteMessage" class="cancel-btn">Cancelar</button>
          </div>
        </div>
      </div>
    `;

    setupMessagesEvents(this);
  }
}
customElements.define("messages-component", MessagesComponent);
