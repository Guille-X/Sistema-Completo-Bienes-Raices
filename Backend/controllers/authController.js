// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuariosModel');
const { enviarCorreo } = require('../utils/mailer');

const JWT_SECRET = process.env.JWT_SECRET;

exports.verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    Usuario.buscarPorId(decoded.id, (err, results) => {
      if (err || results.length === 0) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
      }
      const user = results[0];
      res.json({
        user: {
          id: user.id_usuario,
          nombre: user.nombre,
          rol: user.rol,
        }
      });
    });
  } catch (err) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

exports.login = (req, res) => {
  const { correo, contrasena } = req.body;

  Usuario.buscarPorCorreo(correo, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' });
    if (results.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

    const usuario = results[0];
    console.log('Usuario encontrado:', usuario);

    // Validar aprobación
    if (usuario.estado !== 'aprobado') {
        return res.status(403).json({ error: `Acceso denegado: estado actual '${usuario.estado}'` });
      }

    // Validar contraseña
    bcrypt.compare(contrasena, usuario.contrasena, (err, resultado) => {
      if (err) return res.status(500).json({ error: 'Error al verificar la contraseña' });
      if (!resultado) return res.status(401).json({ error: 'Contraseña incorrecta' });

      // Generar token
      const token = jwt.sign({
        id: usuario.id_usuario,
        rol: usuario.rol,
        nombre: usuario.nombre
      }, JWT_SECRET, { expiresIn: '1h' });

      res.json({
        mensaje: 'Login exitoso',
        token,
        usuario: {
          id_usuario: usuario.id_usuario,
          nombre: usuario.nombre,
          correo: usuario.correo,
          rol: usuario.rol
        }
      });
    });
  });
};

exports.register = (req, res) => {
  const { nombre, dpi, profesion, telefono, correo, contrasena, rol } = req.body;

  const resp_dpi = req.files?.resp_dpi?.[0]?.filename || null;
  const resp_diploma = req.files?.resp_diploma?.[0]?.filename || null;
  const resp_cv = req.files?.resp_cv?.[0]?.filename || null;

  if (!nombre || !dpi || !profesion || !telefono || !correo || !contrasena || !rol || !resp_dpi || !resp_diploma || !resp_cv) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios, incluyendo los documentos PDF' });
  }

  Usuario.buscarPorCorreo(correo, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' });
    if (results.length > 0) return res.status(400).json({ error: 'El correo ya está registrado' });

    bcrypt.hash(contrasena, 10, (err, hash) => {
      if (err) return res.status(500).json({ error: 'Error al encriptar la contraseña' });

      Usuario.crearUsuario({
        nombre,
        dpi,
        profesion,
        telefono,
        correo,
        contrasena: hash,
        rol,
        resp_dpi,
        resp_diploma,
        resp_cv
      }, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al crear el usuario' });
        res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
      });
    });
  });
};

exports.listarNoAprobados = (req, res) => {
  Usuario.buscarNoAprobados((err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener usuarios' });
    res.json(results);
  });
};

exports.aprobarUsuario = (req, res) => {
  const { id } = req.params;
  Usuario.aprobarUsuario(id, (err) => {
    if (err) return res.status(500).json({ error: 'Error al aprobar usuario' });

    Usuario.buscarPorId(id, (err, results) => {
      if (!err && results.length > 0) {
        const usuario = results[0];
        enviarCorreo(
          usuario.correo,
          'Tu cuenta ha sido aprobada ✅',
          `<p>Hola ${usuario.nombre}, tu cuenta ha sido aprobada. Ya puedes acceder a la plataforma.</p>`
        );
      }
    });

    res.json({ mensaje: 'Usuario aprobado correctamente' });
  });
};

exports.rechazarUsuario = (req, res) => {
  const { id } = req.params;
  Usuario.buscarPorId(id, (err, results) => {
    if (!err && results.length > 0) {
      const usuario = results[0];
      enviarCorreo(
        usuario.correo,
        'Tu cuenta ha sido rechazada ❌',
        `<p>Hola ${usuario.nombre}, lamentamos informarte que tu cuenta ha sido rechazada.</p>`
      );
    }

    Usuario.rechazarUsuario(id, (err) => {
      if (err) return res.status(500).json({ error: 'Error al rechazar usuario' });
      res.json({ mensaje: 'Usuario rechazado correctamente' });
    });
  });
};
