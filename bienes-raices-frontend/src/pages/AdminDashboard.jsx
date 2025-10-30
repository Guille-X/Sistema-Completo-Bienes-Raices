// src/pages/AdminDashboard.jsx
import { useAuth } from '../utils/useAuth';

export default function AdminDashboard() {
  const { usuario, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;
  if (!usuario || usuario.rol !== 'Administrador') return <p>Acceso denegado</p>;

  return <h2>Panel de administrador =) </h2>;
}


