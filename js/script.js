const botonTema = document.getElementById("boton-tema");
  const iconoTema = botonTema.querySelector("i");
  const textoTema = botonTema.querySelector("span");

  function aplicarTema(tema) {
    document.documentElement.dataset.bsTheme = tema;
    const esOscuro = tema === "dark";

    textoTema.textContent = esOscuro ? "Tema claro" : "Tema oscuro";
    iconoTema.classList.toggle("bi-sun-fill", esOscuro);
    iconoTema.classList.toggle("bi-moon-stars-fill", !esOscuro);
  }

  aplicarTema(localStorage.getItem("biblioweb-tema") === "dark" ? "dark" : "light");

  botonTema.addEventListener("click", () => {
    const tema = document.documentElement.dataset.bsTheme === "dark" ? "light" : "dark";
    aplicarTema(tema);
    localStorage.setItem("biblioweb-tema", tema);
  });

  const buscadorLibros = document.getElementById("buscador-libros");
  const filtrosCatalogo = document.querySelectorAll(".filtro-catalogo");
  const tarjetasLibro = document.querySelectorAll(".tarjeta-libro");
  const contadorLibros = document.getElementById("contador-libros");

  if (buscadorLibros && filtrosCatalogo.length && tarjetasLibro.length) {
    let filtroActual = "todos";

    function actualizarCatalogo() {
      const busqueda = buscadorLibros.value.trim().toLowerCase();
      let visibles = 0;

      tarjetasLibro.forEach((tarjeta) => {
        const coincideCategoria = filtroActual === "todos" || tarjeta.dataset.categoria === filtroActual;
        const coincideBusqueda = tarjeta.dataset.busqueda.includes(busqueda);
        const visible = coincideCategoria && coincideBusqueda;

        tarjeta.classList.toggle("oculta", !visible);
        if (visible) visibles += 1;
      });

      if (contadorLibros) {
        contadorLibros.textContent = `${visibles} ${visibles === 1 ? "título" : "títulos"}`;
      }
    }

    filtrosCatalogo.forEach((filtro) => {
      filtro.addEventListener("click", () => {
        filtroActual = filtro.dataset.filtro;
        filtrosCatalogo.forEach((item) => item.classList.toggle("activo", item === filtro));
        actualizarCatalogo();
      });
    });

    buscadorLibros.addEventListener("input", actualizarCatalogo);
  }