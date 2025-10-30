const db = require('../config/db');

exports.registrarReferencial = (req, res) => {
  try {
    console.log('📦 req.body:', req.body);
    console.log('🖼️ req.file:', req.file);

    const id_documento = req.body?.id_documento;
    const tipo_documento = req.body?.tipo_documento;
    const link_fuente = req.body?.link_fuente;
    const valor_total = req.body?.valor_total;
    const area_terreno = req.body?.area_terreno;
    const area_construccion = req.body?.area_construccion;
    const valor_construccion = req.body?.valor_construccion;
    const foto_path = req.file ? `/uploads/${req.file.filename}` : null;
    const departamento = req.body?.departamento;
    const municipio = req.body?.municipio;

    if (!id_documento || !tipo_documento || !link_fuente || !valor_total || !area_terreno || !valor_construccion) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const sql = `
      INSERT INTO referenciales_inmueble (
        id_documento, tipo_documento, link_fuente,
        valor_total, area_terreno, area_construccion,
        valor_construccion, foto_path, departamento, municipio
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      id_documento, tipo_documento, link_fuente,
      valor_total, area_terreno, area_construccion,
      valor_construccion, foto_path, departamento, municipio
    ];

    db.query(sql, values, (err) => {
      if (err) {
        console.error('❌ Error al guardar referencial:', err);
        return res.status(500).json({ error: 'Error al guardar referencial' });
      }
      res.json({ mensaje: 'Referencial registrado correctamente' });
    });
  } catch (error) {
    console.error('❗ Error inesperado:', error);
    res.status(500).json({ error: 'Error inesperado en el servidor' });
  }
};


exports.obtenerReferencialesPorDocumento = (req, res) => {
  const { tipo, id } = req.params;

  const sql = `
    SELECT id, link_fuente, valor_total, area_terreno, area_construccion,
           valor_construccion, valor_suelo, valor_suelo_m2, foto_path, fecha_registro, departamento, municipio
    FROM referenciales_inmueble
    WHERE tipo_documento = ? AND id_documento = ?
    ORDER BY fecha_registro DESC
  `;

  db.query(sql, [tipo, id], (err, results) => {
    if (err) {
      console.error('Error al obtener referenciales:', err);
      return res.status(500).json({ error: 'Error al obtener referenciales' });
    }
    res.json(results);
  });
};
