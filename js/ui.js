import { criarUsuarios, listarUsuarios, editarUsuarios, deletarUsuario } from "./crud.js"

export function setupUI() {
  const errorMessage = document.getElementById("errorMessage")

  document.getElementById("btnCriar").addEventListener("click", () => {
    const nome = document.getElementById("nome").value.trim()
    const email = document.getElementById("email").value.trim()

    if (!nome || !email) {
      // Substituir alert por mensagem de erro estilizada
      errorMessage.classList.add("visible")
      setTimeout(() => {
        errorMessage.classList.remove("visible")
      }, 3000)
      return
    }

    criarUsuarios(nome, email)
    renderLista()
    document.getElementById("nome").value = ""
    document.getElementById("email").value = ""

    // Feedback visual de sucesso
    showToast("Usuário criado com sucesso!")
  })
  renderLista()
}

function renderLista() {
  const lista = document.getElementById("listaUsuarios")
  lista.innerHTML = ""

  listarUsuarios((usuarios) => {
    if (usuarios.length === 0) {
      lista.innerHTML = '<div class="empty-list">Nenhum usuário cadastrado</div>'
      return
    }

    usuarios.forEach((usuario) => {
      const li = document.createElement("li")

      li.innerHTML = `
            <div class="user-info">
                <div class="user-name">${usuario.nome}</div>
                <div class="user-email">${usuario.email}</div>
            </div>
            <div class="action-buttons">
                <button onclick="editar(${usuario.id})"><i class="fas fa-edit"></i> Editar</button>
                <button onclick="excluir(${usuario.id})"><i class="fas fa-trash-alt"></i> Excluir</button>
            </div>
            `
      lista.appendChild(li)
    })
  })
}

// Função para mostrar toast de sucesso
function showToast(message) {
  // Criar elemento toast
  const toast = document.createElement("div")
  toast.className = "toast"
  toast.textContent = message

  // Adicionar ao body
  document.body.appendChild(toast)

  // Mostrar e depois esconder
  setTimeout(() => {
    toast.classList.add("show")

    setTimeout(() => {
      toast.classList.remove("show")
      setTimeout(() => {
        document.body.removeChild(toast)
      }, 300)
    }, 3000)
  }, 100)
}

window.editar = (id) => {
  const novoNome = prompt("Novo Nome")
  const novoEmail = prompt("Novo Email")

  if (novoNome && novoEmail) {
    editarUsuarios(id, novoNome, novoEmail)
    renderLista()
    showToast("Usuário atualizado com sucesso!")
  }
}

window.excluir = (id) => {
  if (confirm("Tu tem certeza?")) {
    deletarUsuario(id)
    renderLista()
    showToast("Usuário excluído com sucesso!")
  }
}

// Adicionar estilo para o toast
const style = document.createElement("style")
style.textContent = `
    .toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--accent-success);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .toast.show {
        opacity: 1;
        transform: translateY(0);
    }
`
document.head.appendChild(style)
