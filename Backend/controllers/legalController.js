const db = require('../config/db');

exports.registrarCertificacion = (req, res) => {
  const {
    fecha, propietario, area, direccion,
    colindancias, orientacion_medida_colindante
  } = req.body;
  const documento = req.file?.filename;

  const sql = `
    INSERT INTO certificaciones (fecha, propietario, area, direccion, colindancias, orientacion_medida_colindante, documento_path)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [fecha, propietario, area, direccion, colindancias, orientacion_medida_colindante, documento], (err) => {
    if (err) return res.status(500).json({ error: 'Error al registrar certificación' });
    res.json({ mensaje: 'Certificación registrada correctamente' });
  });
};

exports.registrarEscritura = (req, res) => {
  const {
    numero_escritura, abogado, poseedor, area,
    direccion, colindancias
  } = req.body;
  const documento = req.file?.filename;

  const sql = `
    INSERT INTO escrituras (numero_escritura, abogado, poseedor, area, direccion, colindancias, documento_path)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [numero_escritura, abogado, poseedor, area, direccion, colindancias, documento], (err) => {
    if (err) return res.status(500).json({ error: 'Error al registrar escritura' });
    res.json({ mensaje: 'Escritura registrada correctamente' });
  });
};

exports.calcularAreaHeron = (req, res) => {
  const { a, b, c } = req.body;
  const s = (a + b + c) / 2;
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
  res.json({ area_calculada: area });
};

exports.obtenerCertificacionesPendientes = (req, res) => {
  db.query('SELECT * FROM certificaciones WHERE estado IS NULL', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener certificaciones' });
    res.json(results);
  });
};

exports.actualizarEstadoCertificacion = (req, res) => {
  const { id, estado } = req.body;
  db.query('UPDATE certificaciones SET estado = ? WHERE id = ?', [estado, id], (err) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar estado' });
    res.json({ mensaje: `Certificación ${estado}` });
  });
};

exports.obtenerEscriturasPendientes = (req, res) => {
  db.query('SELECT * FROM escrituras WHERE estado IS NULL', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener escrituras' });
    res.json(results);
  });
};

exports.actualizarEstadoEscritura = (req, res) => {
  const { id, estado } = req.body;
  db.query('UPDATE escrituras SET estado = ? WHERE id = ?', [estado, id], (err) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar estado' });
    res.json({ mensaje: `escrituras ${estado}` });
  });
};