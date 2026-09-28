// vistas.js — Genera las páginas HTML de respuesta que el servidor envía al navegador
function escapar(texto) {
  return String(texto)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function plantilla(titulo, cuerpo) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titulo}</title>
  <link rel="stylesheet" href="/css/estilos.css">
</head>
<body class="pagina-centro">
${cuerpo}
</body>
</html>`;
}

/** Página: autenticación correcta */
function paginaExito(nombre, usuario) {
  return plantilla('Autenticación correcta', `
  <main class="tarjeta resultado exito">
    <div class="icono-resultado">&#10004;</div>
    <h1>Autenticación correcta</h1>
    <p>Bienvenido(a), <strong>${escapar(nombre)}</strong> (<code>${escapar(usuario)}</code>).</p>
    <p>Tus credenciales fueron validadas contra la base de datos.</p>
    <a class="boton" href="/productos.html">Ir al catálogo de productos</a>
  </main>`);
}

/** Página: autenticación errónea */
function paginaError(motivo) {
  return plantilla('Autenticación errónea', `
  <main class="tarjeta resultado error">
    <div class="icono-resultado">&#10006;</div>
    <h1>Autenticación errónea</h1>
    <p>${escapar(motivo)}</p>
    <a class="boton" href="/login.html">Volver a intentar</a>
  </main>`);
}

module.exports = { paginaExito, paginaError };
