let messages = [];
let messageIdToDelete = null;

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
        <div class="profile-icon">
          <i class="fas fa-user-circle"></i>
        </div>
        <div class="message-content">
          <p class="message-name"><strong>${message.name}</strong></p>
          <p class="message-timestamp">${new Date(
            message.timestamp
          ).toLocaleString()}</p>
        </div>
      </div>
    `
    )
    .join("");

  messageDetails.innerHTML = "";
}

window.showMessageDetails = function (message) {
  const messageDetails = document.getElementById("messageDetails");

  if (message) {
    messageDetails.innerHTML = `
      <div class="message-header">
        <p><strong>${message.name}</strong> (${message.email})</p>
      </div>
      <div class="message-content">
        <p>${message.content}</p>
      </div>
      <div class="message-footer">
        <p><small>${new Date(message.timestamp).toLocaleString()}</small></p>
        <button class="btn-delete" onclick="confirmDeleteMessage('${
          message.id
        }')">Excluir</button>
      </div>
    `;
  }
};

window.confirmDeleteMessage = function (id) {
  messageIdToDelete = id;
  const modal = document.getElementById("deleteMessageModal");
  modal.classList.remove("hidden");
};

export async function deleteMessage() {
  const token = localStorage.getItem("jwtToken");

  try {
    const response = await fetch(
      `http://127.0.0.1:8080/api/v1/messages/${messageIdToDelete}`,
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
      messageIdToDelete = null;
    } else {
      throw new Error("Erro ao excluir a mensagem.");
    }
  } catch (error) {
    console.error("Erro ao excluir a mensagem:", error);
    showToast("Erro ao excluir a mensagem.", "error");
  } finally {
    const modal = document.getElementById("deleteMessageModal");
    modal.classList.add("hidden");
  }
}

export function setupMessagesEvents(element) {
  fetchMessages();

  const cancelDeleteButton = element.querySelector("#cancelDeleteMessage");
  const confirmDeleteButton = element.querySelector("#confirmDeleteMessage");

  cancelDeleteButton.addEventListener("click", () => {
    const modal = document.getElementById("deleteMessageModal");
    modal.classList.add("hidden");
    messageIdToDelete = null;
  });

  confirmDeleteButton.addEventListener("click", async () => {
    await deleteMessage();
  });
}

