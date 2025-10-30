const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const legalRoutes = require('./routes/legalRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 👉 Servir archivos estáticos desde la carpeta uploads
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/legal', legalRoutes);

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend funcionando 🚀');
});

app.use('/api/legal/factores', require('./routes/factoresRoutes'));


// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🟢 Servidor corriendo en http://localhost:${PORT}`);
});

// Middleware para manejar errores de multer y otros
app.use((err, req, res, next) => {
  if (err instanceof Error && err.message === 'Solo se permiten archivos PDF') {
    return res.status(400).json({ error: err.message });
  }

  // Otros errores
  console.error('Error inesperado:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

