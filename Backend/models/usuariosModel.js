// models/usuariosModel.js
const db = require('../config/db');

const Usuario = {
  buscarPorCorreo: (correo, callback) => {
    const sql = 'SELECT * FROM usuarios WHERE correo = ?';
    db.query(sql, [correo], callback);
  },

  buscarPorId: (id, callback) => {
    const sql = 'SELECT * FROM usuarios WHERE id_usuario = ?';
    db.query(sql, [id], callback);
  },

  crearUsuario: (usuario, callback) => {
    const sql = `INSERT INTO usuarios 
  (nombre, dpi, profesion, telefono, correo, contrasena, rol, resp_dpi, resp_diploma, resp_cv, fecha_registro, estado) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), 'pendiente')`;

    const { nombre, dpi, profesion, telefono, correo, contrasena, rol, resp_dpi, resp_diploma, resp_cv } = usuario;
    db.query(sql, [nombre, dpi, profesion, telefono, correo, contrasena, rol, resp_dpi, resp_diploma, resp_cv], callback);
  },

  buscarNoAprobados: (callback) => {
  const sql = "SELECT * FROM usuarios WHERE estado = 'pendiente'";
  db.query(sql, callback);
  },

  aprobarUsuario: (id, callback) => {
  const sql = "UPDATE usuarios SET estado = 'aprobado' WHERE id_usuario = ?";
  db.query(sql, [id], callback);
  },

rechazarUsuario: (id, callback) => {
  const sql = "UPDATE usuarios SET estado = 'rechazado' WHERE id_usuario = ?";
  db.query(sql, [id], callback);
  }

};

module.exports = Usuario;