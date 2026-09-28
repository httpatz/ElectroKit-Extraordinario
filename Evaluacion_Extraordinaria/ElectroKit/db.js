// db.js — Conexión al gestor de base de datos (MySQL / MariaDB)
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     Number(process.env.DB_PORT || 3306),
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'tienda_electronica',
  waitForConnections: true,
  connectionLimit: 10
});

/**
 * Busca un usuario por su nombre de usuario.
 * Devuelve { usuario, password, nombre } o null si no existe.
 */
async function buscarUsuario(usuario) {
  const sql = 'SELECT usuario, password, nombre FROM usuarios WHERE usuario = ? LIMIT 1';
  const [filas] = await pool.execute(sql, [usuario]); // consulta parametrizada (evita inyección SQL)
  return filas.length ? filas[0] : null;
}

module.exports = { pool, buscarUsuario };
