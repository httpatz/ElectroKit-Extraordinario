// productos.js — Construye la tabla 3x3 y maneja galería, estrellas y comentarios
(function () {
  const COLUMNAS = 3;
  const CLAVE_STORAGE = 'electrokit_comentarios';
  let usuarioActual = 'invitado';

  // ---------- Sesión (nombre del usuario autenticado) ----------
  fetch('/api/sesion')
    .then(r => (r.ok ? r.json() : null))
    .then(s => {
      if (s && s.autenticado) {
        usuarioActual = s.usuario;
        document.getElementById('saludo').textContent = `Hola, ${s.nombre}`;
      }
    })
    .catch(() => {});

  // ---------- Comentarios agregados por el usuario (se guardan en el navegador) ----------
  function leerGuardados() {
    try { return JSON.parse(localStorage.getItem(CLAVE_STORAGE)) || {}; }
    catch (e) { return {}; }
  }
  function guardar(idProducto, comentario) {
    try {
      const todos = leerGuardados();
      (todos[idProducto] = todos[idProducto] || []).push(comentario);
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(todos));
    } catch (e) { /* si no hay almacenamiento, el comentario vive solo en memoria */ }
  }
  const guardados = leerGuardados();
  PRODUCTOS.forEach(p => { p.comentarios = p.comentarios.concat(guardados[p.id] || []); });

  // ---------- Utilidades ----------
  function fechaEnvio(dias) {
    const f = new Date();
    f.setDate(f.getDate() + dias);
    return f;
  }
  function hoyISO() {                         // fecha local AAAA-MM-DD
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  const formatoFecha = new Intl.DateTimeFormat('es-MX', { weekday: 'long', day: 'numeric', month: 'long' });

  function calificacionPromedio(p) {
    if (!p.comentarios.length) return p.calificacion;
    const suma = p.comentarios.reduce((s, c) => s + Number(c.estrellas), 0);
    return Math.round(suma / p.comentarios.length);
  }

  /** Devuelve un fragmento con 5 imágenes de estrella (rellenas y vacías) */
  function estrellas(n, tam) {
    const frag = document.createDocumentFragment();
    for (let i = 1; i <= 5; i++) {
      const img = document.createElement('img');
      img.src = i <= n ? 'img/estrella-llena.svg' : 'img/estrella-vacia.svg';
      img.alt = i <= n ? '★' : '☆';
      img.width = img.height = tam || 20;
      frag.appendChild(img);
    }
    return frag;
  }

  // ---------- Render de una celda ----------
  function crearProducto(p) {
    const nodo = document.getElementById('plantillaProducto').content.cloneNode(true);
    const art = nodo.querySelector('.producto');

    art.querySelector('.p-nombre').textContent = p.nombre;
    art.querySelector('.p-descripcion').textContent = p.descripcion;

    const f = fechaEnvio(p.diasEnvio);
    const time = art.querySelector('.p-envio time');
    time.dateTime = f.toISOString().slice(0, 10);
    time.textContent = `${formatoFecha.format(f)} (${p.diasEnvio} día${p.diasEnvio > 1 ? 's' : ''})`;

    // Galería: la primera imagen va en grande, las demás como miniaturas
    const grande = art.querySelector('.img-grande');
    grande.src = p.imagenes[0];
    grande.alt = `${p.nombre} — imagen principal`;
    const cont = art.querySelector('.miniaturas');
    p.imagenes.slice(1).forEach((src, i) => {
      const mini = document.createElement('img');
      mini.src = src;
      mini.alt = `${p.nombre} — miniatura ${i + 1}`;
      mini.tabIndex = 0;
      mini.className = 'miniatura';
      const intercambiar = () => {           // intercambia miniatura <-> imagen grande
        const tmp = grande.src;
        grande.src = mini.src;
        mini.src = tmp;
        grande.classList.remove('animar'); void grande.offsetWidth; grande.classList.add('animar');
      };
      mini.addEventListener('click', intercambiar);
      mini.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); intercambiar(); } });
      cont.appendChild(mini);
    });

    // Calificación y comentarios
    const zonaEstrellas = art.querySelector('.estrellas');
    const valor = art.querySelector('.valor');
    const num = art.querySelector('.num');
    const lista = art.querySelector('.lista-comentarios');

    function pintarCalificacion() {
      const c = calificacionPromedio(p);
      zonaEstrellas.replaceChildren(estrellas(c, 22));
      valor.textContent = `${c}/5 · ${p.comentarios.length} ${p.comentarios.length === 1 ? 'opinión' : 'opiniones'}`;
      num.textContent = p.comentarios.length;
    }

    function pintarComentarios() {
      lista.replaceChildren();
      if (!p.comentarios.length) {
        const li = document.createElement('li');
        li.className = 'vacio';
        li.textContent = 'Aún no hay comentarios. ¡Sé el primero!';
        lista.appendChild(li);
        return;
      }
      p.comentarios.forEach(c => {
        const li = document.createElement('li');
        const cab = document.createElement('div');
        cab.className = 'c-cabecera';
        const quien = document.createElement('strong');
        quien.textContent = c.usuario;
        const cuando = document.createElement('span');
        cuando.className = 'c-fecha';
        cuando.textContent = c.fecha;
        const st = document.createElement('span');
        st.className = 'c-estrellas';
        st.appendChild(estrellas(Number(c.estrellas), 14));
        cab.append(quien, st, cuando);
        const txt = document.createElement('p');
        txt.textContent = c.texto;
        li.append(cab, txt);
        lista.appendChild(li);
      });
    }

    const boton = art.querySelector('.boton-comentarios');
    const seccion = art.querySelector('.comentarios');
    boton.addEventListener('click', () => {
      const abrir = seccion.hidden;
      seccion.hidden = !abrir;
      boton.setAttribute('aria-expanded', String(abrir));
      if (abrir) pintarComentarios();
    });

    const form = art.querySelector('.form-comentario');
    const err = form.querySelector('.mensaje-error');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const texto = form.texto.value.trim();
      if (texto.length < 3) { err.textContent = 'Escribe al menos 3 caracteres.'; return; }
      err.textContent = '';
      const nuevo = {
        usuario: usuarioActual,
        estrellas: Number(form.estrellas.value),
        texto,
        fecha: hoyISO()
      };
      p.comentarios.push(nuevo);
      guardar(p.id, nuevo);
      form.reset();
      pintarComentarios();
      pintarCalificacion();
    });

    pintarCalificacion();
    return nodo;
  }

  // ---------- Construcción de la tabla 3 x 3 ----------
  const tbody = document.querySelector('#tablaProductos tbody');
  for (let fila = 0; fila < PRODUCTOS.length / COLUMNAS; fila++) {
    const tr = document.createElement('tr');
    for (let col = 0; col < COLUMNAS; col++) {
      const p = PRODUCTOS[fila * COLUMNAS + col];
      const td = document.createElement('td');
      if (p) td.appendChild(crearProducto(p));
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
})();
