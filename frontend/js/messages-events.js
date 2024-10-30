let messages = []; 

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
      messages = await response.json(); 
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
  const messageDetails = document.getElementById("messageDetails"); 

  if (!messagesList || !messageDetails) return;

  messagesList.innerHTML = messages
    .map(
      (message) => `
      <div class="message-item" onclick='showMessageDetails(${JSON.stringify(
        message
      )})'>
        <p><strong>De:</strong> ${message.name}</p>
        <p><small>${new Date(message.timestamp).toLocaleString()}</small></p>
      </div>
    `
    )
    .join("");

  messageDetails.innerHTML = ""; 
}

// Função para mostrar detalhes da mensagem ao clicar
window.showMessageDetails = function (message) {
  // Recebe a mensagem como argumento
  const messageDetails = document.getElementById("messageDetails");

  if (message) {
    messageDetails.innerHTML = `
      <h3>Mensagem Completa</h3>
      <p><strong>De:</strong> ${message.name} (${message.email})</p>
      <p><strong>Conteúdo:</strong> ${message.content}</p>
      <p><small>${new Date(message.timestamp).toLocaleString()}</small></p>
      <button onclick="confirmDeleteMessage('${message.id}')">Excluir</button>
    `;
  }
};

// Função para exibir o modal de confirmação de exclusão
function confirmDeleteMessage(id) {
  const confirmation = window.confirm(
    "Tem certeza que deseja excluir esta mensagem?"
  );
  if (confirmation) {
    deleteMessage(id);
  }
}

// Função para excluir uma mensagem
export async function deleteMessage(id) {
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await fetch(
      `http://127.0.0.1:8080/api/v1/messages/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      showToast("Mensagem excluída com sucesso.", "success");
      fetchMessages(); 
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
window.confirmDeleteMessage = confirmDeleteMessage;
