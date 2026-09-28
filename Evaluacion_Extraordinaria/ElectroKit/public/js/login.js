// login.js — Validación de datos del formulario en el navegador
(function () {
  const form = document.getElementById('formLogin');
  const inUsuario = document.getElementById('usuario');
  const inPassword = document.getElementById('password');
  const errUsuario = document.getElementById('errorUsuario');
  const errPassword = document.getElementById('errorPassword');

  const REGEX_USUARIO = /^[A-Za-z0-9_]{3,20}$/;
  const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d).{6,20}$/;

  function validarUsuario() {
    const v = inUsuario.value.trim();
    let msg = '';
    if (v === '') msg = 'El usuario es obligatorio.';
    else if (v.length < 3) msg = 'Debe tener al menos 3 caracteres.';
    else if (!REGEX_USUARIO.test(v)) msg = 'Solo letras, números y guion bajo (_).';
    mostrar(inUsuario, errUsuario, msg);
    return msg === '';
  }

  function validarPassword() {
    const v = inPassword.value;
    let msg = '';
    if (v === '') msg = 'La contraseña es obligatoria.';
    else if (v.length < 6) msg = 'Debe tener al menos 6 caracteres.';
    else if (!REGEX_PASSWORD.test(v)) msg = 'Debe incluir al menos una letra y un número.';
    mostrar(inPassword, errPassword, msg);
    return msg === '';
  }

  function mostrar(input, contenedor, msg) {
    contenedor.textContent = msg;
    input.classList.toggle('invalido', msg !== '');
    input.classList.toggle('valido', msg === '' && input.value !== '');
  }

  inUsuario.addEventListener('input', validarUsuario);
  inPassword.addEventListener('input', validarPassword);

  document.getElementById('verPassword').addEventListener('click', function () {
    const oculto = inPassword.type === 'password';
    inPassword.type = oculto ? 'text' : 'password';
    this.textContent = oculto ? 'Ocultar' : 'Ver';
  });

  form.addEventListener('submit', function (e) {
    const okU = validarUsuario();
    const okP = validarPassword();
    if (!okU || !okP) {
      e.preventDefault();                 // no se envía al servidor si hay errores
      (okU ? inPassword : inUsuario).focus();
    }
  });
})();
