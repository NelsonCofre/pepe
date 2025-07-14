const usuario = JSON.parse(localStorage.getItem("usuario"));
if (!usuario) window.location.href = "login.html";

// Obtener historial desde localStorage
const historial = JSON.parse(localStorage.getItem("historialAcciones")) || [];

function renderHistorial() {
  const agregados = document.getElementById("log-agregados");
  const modificados = document.getElementById("log-modificados");
  const eliminados = document.getElementById("log-eliminados");

  agregados.innerHTML = "";
  modificados.innerHTML = "";
  eliminados.innerHTML = "";

  historial.forEach((entry) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${entry.fecha}</strong> → 
      <em>${entry.nombre}</em> (${entry.categoria}) - ${entry.accion}
    `;

    if (entry.accion === "Agregado") agregados.appendChild(li);
    else if (entry.accion === "Modificado") modificados.appendChild(li);
    else if (entry.accion === "Eliminado") eliminados.appendChild(li);
  });
}

renderHistorial();

// Modal logout
document.getElementById("logoutLink").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("logoutModal").classList.remove("hidden");
});

document.getElementById("confirmLogout").addEventListener("click", () => {
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
});

document.getElementById("cancelLogout").addEventListener("click", () => {
  document.getElementById("logoutModal").classList.add("hidden");
});

const toggleSidebarBtn = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar");

if (toggleSidebarBtn && sidebar) {
  toggleSidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar-collapsed");
  });
}
