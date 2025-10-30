const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = require('../config/uploadConfig');
const legalController = require('../controllers/legalController');
const factoresController = require('../controllers/factoresController');
const referencialesController = require('../controllers/referencialesController');


const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

router.post('/certificacion', upload.single('documento'), legalController.registrarCertificacion);
router.post('/escritura', upload.single('documento'), legalController.registrarEscritura);
router.post('/calcular_area', legalController.calcularAreaHeron);
router.get('/certificaciones/pendientes', legalController.obtenerCertificacionesPendientes);
router.post('/certificaciones/estado', legalController.actualizarEstadoCertificacion);
router.get('/escrituras/pendientes', legalController.obtenerEscriturasPendientes);
router.post('/escrituras/estado', legalController.actualizarEstadoEscritura);
router.get('/factores/documentos-valuados', factoresController.obtenerDocumentosValuados);
router.get('/referenciales/:tipo/:id', referencialesController.obtenerReferencialesPorDocumento);
router.post('/referenciales/registrar', upload.single('foto'), referencialesController.registrarReferencial);


module.exports = router;