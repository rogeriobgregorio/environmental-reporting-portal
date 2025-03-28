import { initializeStepEvents } from "../js/step-events.js";

class StepsComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="ecoar-steps">

        <h2 class="ecoar-steps-title">Como funciona denunciar com o ECOAR</h2>

        <div class="ecoar-container left">
          <i class="fas fa-user ecoar-icon"></i>
          <div class="ecoar-content">
            <h3>1. Registro no ECOAR</h3>
            <p>Crie uma conta no ECOAR preenchendo um formulário simples com suas informações.</p>
          </div>
        </div>

        <div class="ecoar-container right">
          <i class="fas fa-sign-in-alt ecoar-icon"></i>
          <div class="ecoar-content">
            <h3>2. Login na Plataforma</h3>
            <p>Acesse sua conta usando seu email e senha.</p>
          </div>
        </div>

        <div class="ecoar-container left">
          <i class="fas fa-edit ecoar-icon"></i>
          <div class="ecoar-content">
            <h3>3. Iniciar uma Denúncia</h3>
            <p>Selecione a opção "Fazer uma Denúncia" no menu.</p>
          </div>
        </div>

        <div class="ecoar-container right">
          <i class="fas fa-file-alt ecoar-icon"></i>
          <div class="ecoar-content">
            <h3>4. Preencher os Detalhes</h3>
            <p>Complete o formulário com informações sobre o que você deseja denunciar, incluindo local, tipo de atividade e descrição.</p>
          </div>
        </div>

        <div class="ecoar-container left">
          <i class="fas fa-camera ecoar-icon"></i>
          <div class="ecoar-content">
            <h3>5. Adicionar Evidências</h3>
            <p>Anexe fotos e/ou imagens que ajudem a corroborar sua denúncia.</p>
          </div>
        </div>

        <div class="ecoar-container right">
          <i class="fas fa-check ecoar-icon"></i>
          <div class="ecoar-content">
            <h3>6. Revisar e Enviar</h3>
            <p>Revise todas as informações e clique em "Enviar" para enviar sua denúncia.</p>
          </div>
        </div>

        <div class="ecoar-container left">
          <i class="fas fa-eye ecoar-icon"></i>
          <div class="ecoar-content">
            <h3>7. Acompanhamento da Denúncia</h3>
            <p>Você pode acompanhar o status da sua denúncia na sua conta e recebendo atualizações sobre o progresso por email.</p>
          </div>
        </div>

        <a href="#" id="step-cta-btn-report" class="step-cta-btn-report">Quero fazer uma denúncia</a>

      </div>
    `;

    initializeStepEvents();
  }
}
customElements.define("steps-component", StepsComponent);
