let userId;

export const showToast = (message, type = "success") => {
  const toast = document.createElement("div");
  toast.classList.add("toast", type);
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("fade-out");
    toast.addEventListener("transitionend", () => {
      toast.remove();
    });
  }, 3000);
};

async function fetchUserByEmail(email) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8080/api/v1/users/search/email?email=${email}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      }
    );
    if (response.ok) {
      const user = await response.json();
      userId = user.id;
      return user;
    } else {
      showToast("Usuário não encontrado.", "error");
    }
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    showToast("Erro ao buscar usuário.", "error");
  }
}


export const handleUpdateSubmit = async (event) => {
  event.preventDefault();
  const email = document.querySelector("#email").value.trim();
  const role = document.querySelector("#role").value;

  const user = await fetchUserByEmail(email);
  if (!user) return;

  try {
    const response = await fetch(
      `http://127.0.0.1:8080/api/v1/users/roles/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: role,
      }
    );

    if (response.ok) showToast("Autorização atualizada com sucesso!");
    else showToast("Erro ao atualizar autorização.", "error");
  } catch (error) {
    console.error("Erro ao atualizar autorização:", error);
  }
};

export const handleDeleteAccount = async () => {
  const email = document.querySelector("#email").value.trim();
  const user = await fetchUserByEmail(email);
  if (!user) return;

  try {
    const response = await fetch(
      `http://127.0.0.1:8080/api/v1/users/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      }
    );

    if (response.ok) {
      showToast("Conta banida com sucesso.");
    } else {
      showToast("Erro ao banir conta.", "error");
    }
  } catch (error) {
    console.error("Erro ao banir conta:", error);
  }
};

export const attachEventListeners = (component) => {
  const form = component.querySelector("#accountForm");
  form.addEventListener("submit", handleUpdateSubmit);

  const deleteButton = component.querySelector(".delete-btn");
  const modal = component.querySelector("#deleteModal");
  const confirmDeleteButton = component.querySelector("#confirmDelete");
  const cancelDeleteButton = component.querySelector("#cancelDelete");

  deleteButton.addEventListener("click", () =>
    modal.classList.remove("hidden")
  );
  cancelDeleteButton.addEventListener("click", () =>
    modal.classList.add("hidden")
  );
  confirmDeleteButton.addEventListener("click", async () => {
    await handleDeleteAccount();
    modal.classList.add("hidden");
  });
};
