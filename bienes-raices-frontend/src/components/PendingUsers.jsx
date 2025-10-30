import { useEffect, useState } from 'react';
import { getPendingUsers, approveUser, rejectUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const baseURL = 'http://localhost:3000/uploads/';

export default function PendingUsers() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getPendingUsers()
      .then((res) => setUsuarios(res.data))
      .catch(() => setMensaje('Error al cargar usuarios'))
      .finally(() => setLoading(false));
  }, []);

  const handleApprove = async (id) => {
    await approveUser(id);
    setUsuarios(usuarios.filter((u) => u.id_usuario !== id));
    setMensaje('✅ Usuario aprobado');
  };

  const handleReject = async (id) => {
    await rejectUser(id);
    setUsuarios(usuarios.filter((u) => u.id_usuario !== id));
    setMensaje('❌ Usuario rechazado');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
    window.location.reload(); // ← fuerza limpieza de sesión
  };

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Usuarios pendientes</h2>
        <button onClick={handleLogout} style={{ backgroundColor: '#f44336', color: 'white', padding: '0.5rem 1rem' }}>
          Cerrar sesión
        </button>
      </div>

      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}

      {usuarios.length === 0 ? (
        <p>No hay usuarios pendientes</p>
      ) : (
        usuarios.map((u) => (
          <div key={u.id_usuario} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <p><strong>{u.nombre}</strong> ({u.correo})</p>
            <p>Profesión: {u.profesion}</p>
            <p>DPI: <a href={`${baseURL}${u.resp_dpi}`} target="_blank" rel="noopener noreferrer">Ver PDF</a></p>
            <p>Diploma: <a href={`${baseURL}${u.resp_diploma}`} target="_blank" rel="noopener noreferrer">Ver PDF</a></p>
            <p>CV: <a href={`${baseURL}${u.resp_cv}`} target="_blank" rel="noopener noreferrer">Ver PDF</a></p>
            <button onClick={() => handleApprove(u.id_usuario)} style={{ marginRight: '1rem' }}>✅ Aprobar</button>
            <button onClick={() => handleReject(u.id_usuario)}>❌ Rechazar</button>
          </div>
        ))
      )}
    </div>
  );
}
