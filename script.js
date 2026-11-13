document.addEventListener("DOMContentLoaded", function () {
  var root = document.documentElement;
  var boton = document.getElementById("themeToggle");
  var icono = document.getElementById("themeIcon");

  // Lee el tema guardado (si el navegador lo permite)
  function leerTema() {
    try { return localStorage.getItem("tema"); } catch (e) { return null; }
  }

  // Aplica el tema y cambia el icono: luna en modo claro, sol en modo oscuro
  function aplicarTema(tema) {
    root.setAttribute("data-theme", tema);
    root.setAttribute("data-bs-theme", tema);
    icono.className = tema === "dark" ? "fas fa-sun" : "fas fa-moon";
  }

  // Tema inicial: el guardado, o el del sistema del usuario
  var guardado = leerTema();
  var sistemaOscuro = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  aplicarTema(guardado || (sistemaOscuro ? "dark" : "light"));

  // Botón para cambiar de tema
  boton.addEventListener("click", function () {
    var nuevo = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    aplicarTema(nuevo);
    try { localStorage.setItem("tema", nuevo); } catch (e) { /* sin guardado */ }
  });

  // Cierra el menú del celular al elegir una sección
  document.querySelectorAll(".nav-link").forEach(function (enlace) {
    enlace.addEventListener("click", function () {
      var menu = document.getElementById("menu");
      if (menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  // Marca en el menú la sección que se está viendo
  var secciones = document.querySelectorAll("main section[id]");
  var enlaces = document.querySelectorAll(".nav-link");
  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        enlaces.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + entrada.target.id);
        });
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  secciones.forEach(function (s) { observador.observe(s); });

  // Formulario de contacto (simulado: no envía datos a ningún lado)
  var form = document.getElementById("contactForm");
  var ok = document.getElementById("formOk");

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      ok.classList.add("d-none");
      return;
    }
    form.reset();
    form.classList.remove("was-validated");
    ok.classList.remove("d-none");
  });

  // Al empezar a escribir otro mensaje, se oculta el aviso anterior
  form.addEventListener("input", function () {
    ok.classList.add("d-none");
  });
});