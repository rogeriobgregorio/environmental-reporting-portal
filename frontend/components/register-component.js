import { handleRegisterSubmit } from "../js/register-events.js";

class RegisterComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="register" class="register-section">
        <h2>Cadastre-se</h2>
        
        <form id="registerForm" class="register-form">
          <div class="form-group">
            <label for="name">Nome:</label>
            <input type="text" id="name" name="name" required>
          </div>
          
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
          </div>
          
          <div class="form-group">
            <label for="password">Senha:</label>
            <input type="password" id="password" name="password" required>
          </div>
          
          <button type="submit" class="submit-btn">Cadastrar</button>
        </form>
      </section>
    `;

    const form = this.querySelector("#registerForm");
    form.addEventListener("submit", handleRegisterSubmit);
  }
}

customElements.define("register-component", RegisterComponent);
