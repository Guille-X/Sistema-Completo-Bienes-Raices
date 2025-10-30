// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './utils/useAuth';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm'; // ✅ nuevo import
import AdminDashboard from './pages/AdminDashboard';
import TechnicianDashboard from './pages/TechnicianDashboard';
import EvaluatorDashboard from './pages/EvaluatorDashboard';
import PendingUsers from './components/PendingUsers';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { usuario, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} /> {/* ✅ nueva ruta */}

        {/* Rutas protegidas */}
        <Route
          path="/admin"
          element={
            usuario?.rol === 'Administrador' ? (
              <PendingUsers />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/tecnico"
          element={
            usuario?.rol === 'Tecnico' ? (
              <TechnicianDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/evaluador"
          element={
            usuario?.rol === 'Evaluador' ? (
              <EvaluatorDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Redirección por defecto */}
        <Route
          path="/"
          element={
            usuario ? (
              <Navigate to={`/${usuario.rol.toLowerCase()}`} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
