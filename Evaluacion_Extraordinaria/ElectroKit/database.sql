-- =========================================================
--  Base de datos: tienda_electronica
--  Única tabla requerida: usuarios (usuario y password)
-- =========================================================

SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS tienda_electronica
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE tienda_electronica;

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
  id_usuario     INT          NOT NULL AUTO_INCREMENT,
  usuario        VARCHAR(20)  NOT NULL,
  password       VARCHAR(20)  NOT NULL,
  nombre         VARCHAR(80)  NOT NULL,
  fecha_registro TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_usuario),
  UNIQUE KEY uk_usuarios_usuario (usuario)
) ENGINE=InnoDB;

-- Usuarios de prueba
INSERT INTO usuarios (usuario, password, nombre) VALUES
  ('atz',     'Atz2026',   'Atziry Martínez'),
  ('admin',   'admin123',  'Administrador'),
  ('alumno1', 'upiita01',  'Alumno de prueba');

-- Usuario de aplicación (opcional, recomendado en lugar de root)
-- CREATE USER IF NOT EXISTS 'tienda_app'@'localhost' IDENTIFIED BY 'tienda_pass';
-- GRANT SELECT ON tienda_electronica.usuarios TO 'tienda_app'@'localhost';
-- FLUSH PRIVILEGES;
