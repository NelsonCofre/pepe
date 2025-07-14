document.addEventListener("DOMContentLoaded", () => {
  // Verifica si el usuario está guardado correctamente
  const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
  console.log("Usuario cargado:", usuarioGuardado);

  // Si no existe o está mal formado, crea uno por defecto
  if (!usuarioGuardado || !usuarioGuardado.email || !usuarioGuardado.password) {
    const usuarioPorDefecto = {
      email: "admin@gmail.com",
      password: "admin123"
    };
    localStorage.setItem("usuario", JSON.stringify(usuarioPorDefecto));
    console.log("Usuario por defecto creado");
  }

  // Escuchar envío del formulario
  const form = document.getElementById("login-form");
  if (form) {
    form.addEventListener("submit", login);
  }
});

// Función de login
function login(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  console.log("Intentando login con:", email, password);
  console.log("Usuario registrado:", usuario);

  if (usuario && email === usuario.email && password === usuario.password) {
    localStorage.setItem("sesion", JSON.stringify({ email }));
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("login-error").textContent =
      "Correo o contraseña incorrectos.";
  }
}
