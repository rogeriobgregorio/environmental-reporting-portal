import { setupMessagesEvents } from "../js/messages-events.js";

class MessagesComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="messages-container">
        <h2>Mensagens</h2>
        <div class="messages-layout">
          <div id="messagesList" class="messages-list"></div>
          <div id="messageDetails" class="message-details"></div> 
        </div>
      </div>
    `;

    setupMessagesEvents(this);
  }
}
customElements.define("messages-component", MessagesComponent);
