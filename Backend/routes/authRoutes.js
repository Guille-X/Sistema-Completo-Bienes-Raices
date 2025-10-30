// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const multer = require('multer');
const path = require('path');

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos PDF'), false);
  }
};

const upload = multer({ storage, fileFilter });

router.post('/login', authController.login);

router.post(
  '/register',
  upload.fields([
    { name: 'resp_dpi', maxCount: 1 },
    { name: 'resp_diploma', maxCount: 1 },
    { name: 'resp_cv', maxCount: 1 }
  ]),
  authController.register
);

router.get('/pendientes', authController.listarNoAprobados);
router.put('/aprobar/:id', authController.aprobarUsuario);
router.get('/verify-token', authController.verifyToken);
router.delete('/rechazar/:id', authController.rechazarUsuario);

module.exports = router;
