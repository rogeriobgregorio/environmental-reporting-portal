export const showToast = (message, type) => {
  const toastContainer = document.createElement("div");
  toastContainer.className = `toast ${type}`;
  toastContainer.innerText = message;

  document.body.appendChild(toastContainer);

  setTimeout(() => {
    toastContainer.classList.add("fade-out");
    setTimeout(() => {
      toastContainer.remove();
    }, 500);
  }, 3500);
};

// Função para buscar todas as mensagens
export async function fetchMessages() {
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await fetch("http://127.0.0.1:8080/api/v1/messages", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const messages = await response.json();
      renderMessages(messages);
    } else {
      throw new Error("Erro ao buscar mensagens.");
    }
  } catch (error) {
    console.error("Erro ao buscar mensagens:", error);
    showToast("Erro ao buscar mensagens.", "error");
  }
}

// Função para renderizar as mensagens na interface
function renderMessages(messages) {
  const messagesList = document.getElementById("messagesList");
  if (!messagesList) return;

  messagesList.innerHTML = messages
    .map(
      (message) => `
      <div class="message-item ${message.messageStatus === 1 ? "read" : "unread"}">
        <p><strong>De:</strong> ${message.name} (${message.email})</p>
        <p>${message.content}</p>
        <p><small>${new Date(message.timestamp).toLocaleString()}</small></p>
        <button onclick="updateMessageStatus('${message.id}', 1)">Marcar como Lida</button>
        <button onclick="updateMessageStatus('${message.id}', 2)">Marcar como Não Lida</button>
        <button onclick="deleteMessage('${message.id}')">Excluir</button>
      </div>
    `
    )
    .join("");
}

// Função para atualizar o status de leitura da mensagem
export async function updateMessageStatus(id, status) {
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await fetch(`http://127.0.0.1:8080/api/v1/messages/message-status/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(status),
    });

    if (response.ok) {
      showToast("Status da mensagem atualizado com sucesso.", "success");
      fetchMessages(); // Atualiza a lista de mensagens após alteração
    } else {
      throw new Error("Erro ao atualizar o status da mensagem.");
    }
  } catch (error) {
    console.error("Erro ao atualizar o status da mensagem:", error);
    showToast("Erro ao atualizar o status da mensagem.", "error");
  }
}

// Função para excluir uma mensagem
export async function deleteMessage(id) {
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await fetch(`http://127.0.0.1:8080/api/v1/messages/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      showToast("Mensagem excluída com sucesso.", "success");
      fetchMessages(); // Atualiza a lista de mensagens após exclusão
    } else {
      throw new Error("Erro ao excluir a mensagem.");
    }
  } catch (error) {
    console.error("Erro ao excluir a mensagem:", error);
    showToast("Erro ao excluir a mensagem.", "error");
  }
}

// Função de configuração dos eventos
export function setupMessagesEvents(element) {
  fetchMessages();
}

// Tornando as funções disponíveis globalmente para o HTML acessar
window.updateMessageStatus = updateMessageStatus;
window.deleteMessage = deleteMessage;