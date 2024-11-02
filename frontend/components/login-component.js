import {
  handleLoginSubmit,
  togglePasswordVisibility,
} from "../js/login-events.js";

class LoginComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="login" class="login-section">
        <h2>Bem-vindo(a) de volta</h2>
        <h3>Insira seus dados de login</h3>
        
        <form id="loginForm" class="login-form">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
          </div>
          
          <div class="form-group password-group">
            <label for="password">Senha:</label>
            <input type="password" id="password" name="password" required>
            <span id="togglePassword" class="toggle-password" role="button" tabindex="0">
              <i class="far fa-eye"></i>
            </span>
          </div>

          <a href="./password.html">Esqueceu a senha?</a>
          
          <button type="submit" class="submit-btn">Entrar</button>

          <a href="./register.html">Não tem uma conta? Cadastre-se</a>
        </form>
      </section>
    `;

    const form = this.querySelector("#loginForm");
    form.addEventListener("submit", handleLoginSubmit);

    const togglePassword = this.querySelector("#togglePassword");
    const passwordInput = this.querySelector("#password");
    togglePassword.addEventListener("click", () => {
      togglePasswordVisibility(togglePassword, passwordInput);
    });
  }
}
customElements.define("login-component", LoginComponent);
