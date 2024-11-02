import { handlePasswordSubmit } from "../js/password-events.js";

class PasswordComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="senha" class="password-section">
        <h2>Solicitar redefinição de senha</h2>
        <h3>Insira seu email para receber uma mensagem de redefinição</h3>
        
        <form id="passwordForm" class="password-form">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
          </div>
          
          <button type="submit" class="submit-btn">Enviar solicitação</button>
        </form>
      </section>
    `;

    const form = this.querySelector("#passwordForm");
    form.addEventListener("submit", handlePasswordSubmit);
  }
}
customElements.define("password-component", PasswordComponent);
