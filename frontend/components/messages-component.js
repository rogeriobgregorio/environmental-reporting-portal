import { setupMessagesEvents } from "../js/messages-events.js";

class MessagesComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="messages-container">
        <h2>Mensagens</h2>
        <div id="messagesList" class="messages-list"></div>
      </div>
    `;

    setupMessagesEvents(this);
  }
}
customElements.define("messages-component", MessagesComponent);
