// Verificar login
const usuario = JSON.parse(localStorage.getItem("usuario"));
if (!usuario) window.location.href = "login.html";

// Elementos
const productTable = document.getElementById("product-table-body");
const logoutModal = document.getElementById("logoutModal");
const confirmLogoutBtn = document.getElementById("confirmLogout");
const cancelLogoutBtn = document.getElementById("cancelLogout");
const logoutLink = document.getElementById("logoutLink");
const busquedaInput = document.getElementById("busqueda");
const toggleSidebarBtn = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar");

// Productos iniciales
const productosIniciales = [
  { nombre: "Camisa Polo", valor: 15000, cantidad: 30, categoria: "Ropa" },
  { nombre: "Jeans Azul", valor: 25000, cantidad: 25, categoria: "Ropa" },
  {
    nombre: "Zapatillas Deportivas",
    valor: 45000,
    cantidad: 15,
    categoria: "Calzado",
  },
];

let productos =
  JSON.parse(localStorage.getItem("productos")) || productosIniciales;
localStorage.setItem("productos", JSON.stringify(productos));

function actualizarContador(cantidad = productos.length) {
  const contador = document.getElementById("contador-productos");
  contador.textContent = `Productos registrados: ${cantidad}`;
}

// ➕ Registrar historial
function registrarAccion(nombre, categoria, accion) {
  const historial = JSON.parse(localStorage.getItem("historialAcciones")) || [];
  historial.push({
    nombre,
    categoria,
    accion,
    fecha: new Date().toLocaleString(),
  });
  localStorage.setItem("historialAcciones", JSON.stringify(historial));
}

// ➕ Agregar producto
function addProduct(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  const valor = Number(document.getElementById("valor").value);
  const cantidad = Number(document.getElementById("cantidad").value);
  const categoria = document.getElementById("categoria").value.trim();

  if (
    !nombre ||
    !categoria ||
    isNaN(valor) ||
    isNaN(cantidad) ||
    valor <= 0 ||
    cantidad < 0
  ) {
    alert("Por favor ingresa datos válidos en todos los campos.");
    return;
  }

  productos.push({ nombre, valor, cantidad, categoria });
  localStorage.setItem("productos", JSON.stringify(productos));
  registrarAccion(nombre, categoria, "Agregado");
  renderProducts();
  event.target.reset();
}

// ✏️ Modificar producto
function editProduct(index, field, value) {
  let nuevoValor =
    field === "valor" || field === "cantidad" ? Number(value) : value.trim();
  if (
    (field === "valor" || field === "cantidad") &&
    (isNaN(nuevoValor) || nuevoValor < 0)
  )
    return;
  if (field !== "valor" && field !== "cantidad" && !nuevoValor) return;

  const anterior = productos[index][field];
  if (anterior !== nuevoValor) {
    productos[index][field] = nuevoValor;
    registrarAccion(
      productos[index].nombre,
      productos[index].categoria,
      "Modificado"
    );
    localStorage.setItem("productos", JSON.stringify(productos));
  }
}

// 🗑️ Eliminar producto
function deleteProduct(index) {
  if (confirm("¿Eliminar producto?")) {
    const eliminado = productos[index];
    registrarAccion(eliminado.nombre, eliminado.categoria, "Eliminado");
    productos.splice(index, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    renderProducts();
  }
}

// 🧾 Renderizar productos
function renderProducts(lista = productos) {
  productTable.innerHTML = "";
  lista.forEach((prod, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input value="${prod.nombre}" onchange="editProduct(${index}, 'nombre', this.value)"></td>
      <td><input type="number" value="${prod.valor}" onchange="editProduct(${index}, 'valor', this.value)"></td>
      <td><input type="number" value="${prod.cantidad}" onchange="editProduct(${index}, 'cantidad', this.value)"></td>
      <td><input value="${prod.categoria}" onchange="editProduct(${index}, 'categoria', this.value)"></td>
      <td><button onclick="deleteProduct(${index})">Eliminar</button></td>
    `;
    productTable.appendChild(row);
  });
  actualizarContador(lista.length);
}

// 🔍 Búsqueda
busquedaInput.addEventListener("input", () => {
  const filtro = busquedaInput.value.toLowerCase();
  const filtrados = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(filtro) ||
      p.categoria.toLowerCase().includes(filtro)
  );
  renderProducts(filtrados);
});

// ⬇ Exportar JSON
function exportarJSON() {
  const dataStr = JSON.stringify(productos, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "productos.json";
  link.click();
}

// 🔐 Modal logout
logoutLink.addEventListener("click", (e) => {
  e.preventDefault();
  logoutModal.classList.remove("hidden"); // Mostrar modal
});
confirmLogoutBtn.addEventListener("click", () => {
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
});
cancelLogoutBtn.addEventListener("click", () => {
  logoutModal.classList.add("hidden"); // Ocultar modal
});

// ☰ Toggle sidebar
toggleSidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("sidebar-collapsed");
});



renderProducts();

