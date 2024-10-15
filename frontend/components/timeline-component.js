class TimeLineComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="ecoar-timeline">
        <h2 class="ecoar-timeline-title">Como Funciona Denunciar com o ECOAR</h2>
        <div class="ecoar-container left">
          <i class="fas fa-user-plus ecoar-icon"></i>
          <div class="ecoar-content">
            <h3>Registro no ECOAR</h3>
            <p>Crie uma conta no ECOAR preenchendo um formulário simples com suas informações.</p>
          </div>
        </div>
        <div class="ecoar-container right">
          <i class="fas fa-sign-in-alt ecoar-icon"></i>
          <div class="ecoar-content">
            <h3>Login na Plataforma</h3>
            <p>Acesse sua conta usando seu email e senha.</p>
          </div>
        </div>
        <div class="ecoar-container left">
          <i class="fas fa-edit ecoar-icon"></i>
          <div class="ecoar-content">
            <h3>Iniciar uma Denúncia</h3>
            <p>Selecione a opção "Fazer uma Denúncia" no menu.</p>
          </div>
        </div>
        <div class="ecoar-container right">
          <i class="fas fa-file-alt ecoar-icon"></i>
          <div class="ecoar-content">
            <h3>Preencher os Detalhes</h3>
            <p>Complete o formulário com informações sobre o que você deseja denunciar, incluindo local, tipo de atividade e descrição.</p>
          </div>
        </div>
        <div class="ecoar-container left">
          <i class="fas fa-camera ecoar-icon"></i>
          <div class="ecoar-content">
            <h3>Adicionar Evidências</h3>
            <p>Anexe fotos ou documentos que ajudem a corroborar sua denúncia.</p>
          </div>
        </div>
        <div class="ecoar-container right">
          <i class="fas fa-check ecoar-icon"></i>
          <div class="ecoar-content">
            <h3>Revisar e Enviar</h3>
            <p>Revise todas as informações e clique em "Enviar" para enviar sua denúncia.</p>
          </div>
        </div>
        <div class="ecoar-container left">
          <i class="fas fa-eye ecoar-icon"></i>
          <div class="ecoar-content">
            <h3>Acompanhamento da Denúncia</h3>
            <p>Você pode acompanhar o status da sua denúncia na sua conta, recebendo atualizações sobre o progresso.</p>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("timeline-component", TimeLineComponent);
