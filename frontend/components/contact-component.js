class ContactComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="contato" class="contact-section">
        <h2>Entre em contato conosco</h2>
        
        <div id="feedback" class="feedback"></div> <!-- Feedback visual -->
        
        <form id="contactForm" class="contact-form">
          <div class="form-group">
            <label for="name">Nome:</label>
            <input type="text" id="name" name="name" required>
          </div>
          
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
          </div>
          
          <div class="form-group">
            <label for="message">Mensagem:</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          
          <button type="submit" class="submit-btn">Enviar mensagem</button>
        </form>
      </section>
    `;

    // Adiciona o listener para o evento de submit do formulário
    const form = this.querySelector("#contactForm");
    form.addEventListener("submit", this.handleSubmit);
  }

  validateForm(data) {
    const feedback = this.querySelector("#feedback");
    feedback.innerHTML = ""; // Limpa qualquer mensagem anterior

    // Validação do nome
    if (data.name.trim() === "") {
      feedback.innerHTML = "Por favor, preencha o nome.";
      return false;
    }

    // Validação de email (uso de regex simples)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      feedback.innerHTML = "Por favor, insira um email válido.";
      return false;
    }

    // Validação da mensagem (mínimo de 10 caracteres)
    if (data.content.trim().length < 10) {
      feedback.innerHTML = "A mensagem deve ter pelo menos 10 caracteres.";
      return false;
    }

    return true; // Se todas as validações forem bem-sucedidas
  }

  // Função de seta preserva o contexto correto de `this`
  handleSubmit = async (event) => {
    event.preventDefault(); // Impede o comportamento padrão de recarregar a página

    const form = event.target;
    const formData = {
      name: form.name.value,
      email: form.email.value,
      content: form.message.value,
    };

    const feedback = this.querySelector("#feedback");

    // Valida o formulário antes de enviar
    if (!this.validateForm(formData)) {
      return; // Se a validação falhar, interrompe o envio
    }

    // Exibe uma mensagem de carregamento
    feedback.innerHTML = "Enviando mensagem...";

    try {
      const response = await fetch("http://localhost:8080/api/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        feedback.innerHTML = "Mensagem enviada com sucesso!";
        form.reset(); // Limpa o formulário após o envio
      } else {
        feedback.innerHTML = "Erro ao enviar a mensagem. Tente novamente.";
      }
    } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
      feedback.innerHTML = "Ocorreu um erro ao enviar a mensagem.";
    }
  };
}

customElements.define("contact-component", ContactComponent);
