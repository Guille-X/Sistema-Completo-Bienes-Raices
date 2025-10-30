const db = require('../config/db');

exports.registrarFactores = (req, res) => {
  const {
    id_documento,
    tipo_documento,
    evaluador,
    area,
    frente,
    fondo,
    pendiente,
    desnivel,
    posicionDesnivel,
    geometria,
    ubicacionManzana,
    distanciaViaPublica,
    factor_area,
    factor_frente,
    factor_fondo,
    factor_pendiente,
    factor_desnivel,
    factor_geometria,
    factor_ubicacion,
    factor_viaPublica,
    factor_total
  } = req.body;

  // Validación básica
  if (!id_documento || !tipo_documento || !evaluador || !factor_total) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  // Verificar si el documento ya fue evaluado
  const checkSql = `
    SELECT COUNT(*) AS total FROM factores_terreno
    WHERE id_documento = ? AND tipo_documento = ?
  `;

  db.query(checkSql, [id_documento, tipo_documento], (err, result) => {
    if (err) {
      console.error('Error al verificar duplicado:', err);
      return res.status(500).json({ error: 'Error al verificar duplicado' });
    }

    if (result[0].total > 0) {
      return res.status(409).json({ error: 'Este documento ya fue evaluado' });
    }

    // Insertar factores
    const sql = `
      INSERT INTO factores_terreno (
        id_documento, tipo_documento, evaluador,
        area, frente, fondo, pendiente, desnivel, posicionDesnivel,
        geometria, ubicacionManzana, distanciaViaPublica,
        factor_area, factor_frente, factor_fondo, factor_pendiente,
        factor_desnivel, factor_geometria, factor_ubicacion, factor_viaPublica,
        factor_total
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      id_documento, tipo_documento, evaluador,
      area, frente, fondo, pendiente, desnivel, posicionDesnivel,
      geometria, ubicacionManzana, distanciaViaPublica,
      factor_area, factor_frente, factor_fondo, factor_pendiente,
      factor_desnivel, factor_geometria, factor_ubicacion, factor_viaPublica,
      factor_total
    ];

    db.query(sql, values, (err) => {
      if (err) {
        console.error('Error SQL:', err);
        return res.status(500).json({ error: 'Error al guardar factores' });
      }
      res.json({ mensaje: 'Factores registrados correctamente' });
    });
  });
};

exports.obtenerResumen = (req, res) => {
  const sql = `
   SELECT id_documento, tipo_documento, evaluador,
       area, frente, fondo, pendiente, desnivel,
       geometria, ubicacionManzana, factor_total, fecha_registro
      FROM factores_terreno
      ORDER BY fecha_registro DESC

  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error SQL:', err);
      return res.status(500).json({ error: 'Error al obtener resumen' });
    }
    res.json(results);
  });
};

exports.obtenerDocumentosAprobados = (req, res) => {
  const sql = `
    SELECT id, 'certificacion' AS tipo_documento, propietario AS nombre
    FROM certificaciones
    WHERE estado = 'aprobado'
    UNION
    SELECT id, 'escritura' AS tipo_documento, poseedor AS nombre
    FROM escrituras
    WHERE estado = 'aprobado'
    ORDER BY id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener documentos aprobados:', err);
      return res.status(500).json({ error: 'Error al obtener documentos' });
    }
    res.json(results);
  });
};

exports.obtenerDetalleDocumento = (req, res) => {
  const { tipo, id } = req.params;

  let sql = '';
  if (tipo === 'certificacion') {
    sql = `SELECT propietario AS nombre, area, direccion, documento_path FROM certificaciones WHERE id = ?`;
  } else if (tipo === 'escritura') {
    sql = `SELECT poseedor AS nombre, area, direccion, documento_path FROM escrituras WHERE id = ?`;
  } else {
    return res.status(400).json({ error: 'Tipo de documento inválido' });
  }

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener detalle:', err);
      return res.status(500).json({ error: 'Error al obtener detalle del documento' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Documento no encontrado' });
    }
    res.json(results[0]);
  });
};

exports.obtenerDocumentosValuados = (req, res) => {
  const sql = `
    SELECT DISTINCT id_documento, tipo_documento
    FROM factores_terreno
    ORDER BY fecha_registro DESC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener documentos valuados:', err);
      return res.status(500).json({ error: 'Error al obtener documentos valuados' });
    }
    res.json(results);
  });
};

