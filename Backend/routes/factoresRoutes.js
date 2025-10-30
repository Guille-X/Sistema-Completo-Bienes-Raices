const express = require('express');
const router = express.Router();
const factoresController = require('../controllers/factoresController');

router.post('/registrar', factoresController.registrarFactores);
router.get('/resumen', factoresController.obtenerResumen);
router.get('/documentos/aprobados', factoresController.obtenerDocumentosAprobados);
router.get('/documentos/detalle/:tipo/:id', factoresController.obtenerDetalleDocumento);
router.get('/api/legal/factores/documentos-valuados', factoresController.obtenerDocumentosValuados);

module.exports = router;
