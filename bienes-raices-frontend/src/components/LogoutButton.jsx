import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
    window.location.reload(); // ← fuerza recarga para limpiar estado
  };

  return (
    <button onClick={handleLogout} style={{ marginLeft: 'auto' }}>
      Cerrar sesión
    </button>
  );
}
