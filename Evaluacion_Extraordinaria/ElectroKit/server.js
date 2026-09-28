// server.js — Servidor WEB (Node.js + Express)
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { buscarUsuario } = require('./db');
const { paginaExito, paginaError } = require('./vistas');

const app = express();
const PUERTO = process.env.PORT || 3000;
const SECRETO = process.env.COOKIE_SECRET || 'upiita-tienda-secreto';

app.use(express.urlencoded({ extended: false }));   // lee datos del formulario (POST)
app.use(express.json());
app.use(cookieParser(SECRETO));

// Validación de formato en el backend (misma regla que en el navegador)
const REGEX_USUARIO = /^[A-Za-z0-9_]{3,20}$/;
const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d).{6,20}$/;

// Middleware: solo usuarios autenticados pueden ver el catálogo
function requiereSesion(req, res, next) {
  if (req.signedCookies.usuario) return next();
  return res.redirect('/login.html');
}

app.get('/', (req, res) => res.redirect('/login.html'));
app.get('/productos.html', requiereSesion);          // protege la página antes del estático

app.use(express.static(path.join(__dirname, 'public')));

// ---------- POST /login : validación de usuario y password en backend ----------
app.post('/login', async (req, res) => {
  // 1. Asignar los valores recibidos del navegador a variables del backend
  const usuario = (req.body.usuario || '').trim();
  const password = req.body.password || '';

  // 2. Validar formato
  if (!REGEX_USUARIO.test(usuario) || !REGEX_PASSWORD.test(password)) {
    return res.status(400).send(paginaError('Los datos enviados no tienen un formato válido.'));
  }

  try {
    // 3. Petición a la base de datos buscando la información del usuario
    const registro = await buscarUsuario(usuario);

    // 4. Comparar el password obtenido de la BD con el enviado desde el navegador
    if (registro && registro.password === password) {
      res.cookie('usuario', registro.usuario, { signed: true, httpOnly: true, sameSite: 'lax' });
      res.cookie('nombre', registro.nombre, { signed: true, httpOnly: true, sameSite: 'lax' });
      return res.send(paginaExito(registro.nombre, registro.usuario));
    }

    // 5. Responder con página de error (no se revela si falló usuario o password)
    return res.status(401).send(paginaError('Usuario o contraseña incorrectos.'));
  } catch (err) {
    console.error('Error de base de datos:', err.message);
    return res.status(500).send(paginaError('No fue posible conectar con la base de datos. Intenta más tarde.'));
  }
});

// Datos de la sesión actual (para mostrar el nombre en el catálogo)
app.get('/api/sesion', (req, res) => {
  if (!req.signedCookies.usuario) return res.status(401).json({ autenticado: false });
  res.json({ autenticado: true, usuario: req.signedCookies.usuario, nombre: req.signedCookies.nombre });
});

app.get('/logout', (req, res) => {
  res.clearCookie('usuario');
  res.clearCookie('nombre');
  res.redirect('/login.html');
});

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});
