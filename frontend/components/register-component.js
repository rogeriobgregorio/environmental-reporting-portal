import {
  initEventListeners,
} from "../js/register-events.js";

class RegisterComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<section id="register" class="register-section">
        <h2>Bem-vindo(a)</h2>
        <h3>Insira seus dados de cadastro</h3>
        
        <form id="registerForm" class="register-form">
          <div class="custom-checkbox-group">
            <label class="custom-checkbox-label">
              <input type="checkbox" id="anonymousCheckbox">
              <span>Quero me cadastrar como usuário anônimo</span>
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
            <label for="password">Senha:</label>
            <input type="password" id="password" name="password" required>
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
          
          <button type="submit" class="submit-btn">Cadastrar</button>

          <h5>
          Ao se cadastrar você concorda com nossos <a href="./terms.html" id="terms-link">Termos de Uso</a>
          </h5>

          <a href="./login.html" class="login-link">Já tem uma conta? Entrar</a>
        </form>
      </section>`;

    initEventListeners(this);
  }
}
customElements.define("register-component", RegisterComponent);
