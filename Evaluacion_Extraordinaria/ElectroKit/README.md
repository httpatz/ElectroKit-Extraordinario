# ElectroKit — Catálogo web con login validado en backend

Node.js + Express (servidor web) · MySQL (gestor de BD) · HTML/CSS/JavaScript

## Requisitos
- Node.js 18 o superior
- MySQL 8 o MariaDB (también funciona con XAMPP)

## Instalación
1. Crear la base de datos y la tabla `usuarios`:
   ```
   mysql -u root -p < database.sql
   ```
   (o abrir `database.sql` en MySQL Workbench / phpMyAdmin y ejecutarlo)
2. Instalar dependencias:
   ```
   npm install
   ```
3. Iniciar el servidor (ajusta la contraseña de tu MySQL si tiene):
   - Windows PowerShell: `$env:DB_PASSWORD="tu_clave"; npm start`
   - Linux / macOS: `DB_PASSWORD=tu_clave npm start`
4. Abrir http://localhost:3000

Variables opcionales: `DB_HOST`, `DB_PORT`, `DB_USER` (root), `DB_PASSWORD` (vacío), `DB_NAME` (tienda_electronica), `PORT` (3000).

## Usuarios de prueba
| usuario | password |
|---|---|
| atz | Atz2026 |
| admin | admin123 |
| alumno1 | upiita01 |

## Flujo
1. `login.html` valida los campos con JavaScript (`js/login.js`).
2. El formulario hace `POST /login`. En `server.js` se asignan `usuario` y `password` a variables, se consulta la tabla `usuarios` (`db.js`) y se compara el password de la BD con el enviado.
3. El servidor responde una página de **Autenticación correcta** o **Autenticación errónea** (`vistas.js`).
4. Con sesión, `productos.html` muestra la tabla 3×3 con nombre, descripción, fecha de envío, estrellas, galería (1 grande + 5 miniaturas intercambiables) y comentarios.

Los comentarios nuevos se guardan en el `localStorage` del navegador, porque la base de datos se limita a una sola tabla.
