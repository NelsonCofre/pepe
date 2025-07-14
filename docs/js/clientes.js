// Verificación de login
const usuario = JSON.parse(localStorage.getItem("usuario"));
if (!usuario) {
  window.location.href = "login.html";
}

// Clientes de ejemplo
const clientesIniciales = [
  {
    nombre: "Camila Rojas",
    email: "camila.rojas23@gmail.com",
    telefono: "+56 9 4532 1187",
    direccion: "Av. Providencia 1234, Providencia, Santiago",
    compras: 5,
  },
  {
    nombre: "Matías González",
    email: "matias.gon.zalez87@gmail.com",
    telefono: "+56 9 9481 2234",
    direccion: "Calle Las Palmeras 221, Viña del Mar, Valparaíso",
    compras: 3,
  },
  {
    nombre: "Fernanda Soto",
    email: "fer.soto94@gmail.com",
    telefono: "+56 9 7654 0192",
    direccion: "Camino El Alba 4350, Las Condes, Santiago",
    compras: 6,
  },
  {
    nombre: "Javier Muñoz",
    email: "javier.munoz78@gmail.com",
    telefono: "+56 9 8912 7753",
    direccion: "Pasaje Los Arrayanes 58, La Serena, Coquimbo",
    compras: 2,
  },
  {
    nombre: "Valentina Pérez",
    email: "valeperez33@gmail.com",
    telefono: "+56 9 7712 3490",
    direccion: "Av. Alemania 2901, Temuco, La Araucanía",
    compras: 7,
  },
  {
    nombre: "Sebastián Ramírez",
    email: "seba.rami@gmail.com",
    telefono: "+56 9 6543 9982",
    direccion: "Calle O’Higgins 112, Concepción, Biobío",
    compras: 4,
  },
  {
    nombre: "Catalina Herrera",
    email: "cata.herrera10@gmail.com",
    telefono: "+56 9 4321 2211",
    direccion: "Av. Kennedy 7021, Vitacura, Santiago",
    compras: 8,
  },
  {
    nombre: "Diego Torres",
    email: "diego.torres.chile@gmail.com",
    telefono: "+56 9 5543 8991",
    direccion: "Calle Arauco 789, Puerto Montt, Los Lagos",
    compras: 1,
  },
  {
    nombre: "Isidora Fuentes",
    email: "isifuentes@gmail.com",
    telefono: "+56 9 8123 6677",
    direccion: "Av. Pedro Aguirre Cerda 1002, Antofagasta",
    compras: 5,
  },
  {
    nombre: "Tomás Vega",
    email: "tomas.vega95@gmail.com",
    telefono: "+56 9 2212 3455",
    direccion: "Calle Balmaceda 215, Rancagua, O’Higgins",
    compras: 6,
  },
  {
    nombre: "Paula Castro",
    email: "paulacastro08@gmail.com",
    telefono: "+56 9 3899 1122",
    direccion: "Pasaje La Quebrada 44, Chillán, Ñuble",
    compras: 4,
  },
  {
    nombre: "Felipe Morales",
    email: "felipem.89@gmail.com",
    telefono: "+56 9 9422 8181",
    direccion: "Av. Circunvalación 234, Talca, Maule",
    compras: 2,
  },
  {
    nombre: "Antonia Salazar",
    email: "antonia.salazar98@gmail.com",
    telefono: "+56 9 7003 3300",
    direccion: "Calle Blanco Encalada 12, Iquique, Tarapacá",
    compras: 3,
  },
  {
    nombre: "Ignacio Reyes",
    email: "ignacio.reyes.cl@gmail.com",
    telefono: "+56 9 6333 2244",
    direccion: "Av. Independencia 310, Independencia, Santiago",
    compras: 7,
  },
  {
    nombre: "Daniela Paredes",
    email: "daniparedes01@gmail.com",
    telefono: "+56 9 4587 9900",
    direccion: "Calle Prat 89, Copiapó, Atacama",
    compras: 5,
  },
];

// Cargar clientes desde localStorage o inicializar si no existen
let clientes = JSON.parse(localStorage.getItem("clientes"));
if (!clientes) {
  clientes = clientesIniciales;
  localStorage.setItem("clientes", JSON.stringify(clientes));
}

const clientesTable = document.getElementById("clientes-table-body");

function renderClientes() {
  clientesTable.innerHTML = "";
  clientes.forEach((c) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${c.nombre}</td>
      <td>${c.email}</td>
      <td>${c.telefono}</td>
      <td>${c.direccion}</td>
      <td>${c.compras}</td>
    `;
    clientesTable.appendChild(row);
  });

  const contador = document.getElementById("contador-clientes");
  if (contador)
    contador.textContent = `Clientes registrados: ${clientes.length}`;
}

renderClientes();

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
