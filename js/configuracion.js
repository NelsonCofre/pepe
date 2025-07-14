document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const sesion = JSON.parse(localStorage.getItem("sesion"));

  // Verifica que haya sesión activa
  if (!sesion) {
    window.location.href = "login.html";
    return;
  }

  // Mostrar datos actuales
  document.getElementById("perfil-email").textContent = usuario.email;
  document.getElementById("perfil-password").textContent = usuario.password;
});

// Guardar nueva contraseña
function guardarNuevaPassword() {
  const nuevaPassword = document.getElementById("nueva-password").value;

  if (nuevaPassword.trim() === "") {
    alert("La contraseña no puede estar vacía.");
    return;
  }

  // Obtener usuario actual y modificar contraseña
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  usuario.password = nuevaPassword;

  // Guardar en localStorage actualizado
  localStorage.setItem("usuario", JSON.stringify(usuario));

  // Actualizar vista
  document.getElementById("perfil-password").textContent = nuevaPassword;
  document.getElementById("nueva-password").value = "";

  alert("Contraseña actualizada correctamente.");
}

// Modal logout
document.getElementById("logoutLink").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("logoutModal").classList.remove("hidden");
});

document.getElementById("confirmLogout").addEventListener("click", () => {
  localStorage.removeItem("sesion"); // SOLO eliminar la sesión
  window.location.href = "login.html";
});

document.getElementById("cancelLogout").addEventListener("click", () => {
  document.getElementById("logoutModal").classList.add("hidden");
});

// Sidebar toggle
const toggleSidebarBtn = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar");

if (toggleSidebarBtn && sidebar) {
  toggleSidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar-collapsed");
  });
}
