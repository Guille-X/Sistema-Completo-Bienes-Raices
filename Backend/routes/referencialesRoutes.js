const express = require('express');
const router = express.Router();
const upload = require('../config/uploadConfig');
const referencialesController = require('../controllers/referencialesController');


router.post('/api/legal/referenciales/registrar', referencialesController.registrarReferencial);
router.get('/api/legal/referenciales/:tipo/:id', referencialesController.obtenerReferencialesPorDocumento);
//router.post('/referenciales/registrar', upload.single('foto'), referencialesController.registrarReferencial);

module.exports = router;
