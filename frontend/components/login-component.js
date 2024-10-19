import { handleLoginSubmit } from "../js/login-events.js";

class LoginComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="login" class="login-section">
        <h2>Acessar Portal</h2>
        
        <form id="loginForm" class="login-form">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
          </div>
          
          <div class="form-group">
            <label for="password">Senha:</label>
            <input type="password" id="password" name="password" required>
          </div>
          
          <button type="submit" class="submit-btn">Entrar</button>
        </form>
      </section>
    `;

    const form = this.querySelector("#loginForm");
    form.addEventListener("submit", handleLoginSubmit);
  }
}

customElements.define("login-component", LoginComponent);
