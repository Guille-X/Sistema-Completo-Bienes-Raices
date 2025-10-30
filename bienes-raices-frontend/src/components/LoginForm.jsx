import { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpiar token anterior
    localStorage.removeItem('token');
    setError('');
    setMensaje('');

    try {
      const res = await login({ correo, contrasena });

      // Guardar nuevo token
      localStorage.setItem('token', res.data.token);

      // Mensaje de éxito
      setMensaje('Sesión iniciada correctamente');

      // Redirigir según rol
      const rol = res.data.usuario.rol.toLowerCase();

      if (rol === 'administrador') {
        navigate('/admin');
      } else if (rol === 'tecnico') {
        navigate('/tecnico');
      } else if (rol === 'evaluador') {
        navigate('/evaluador');
      } else {
        setError('Rol no reconocido');
      }

    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Iniciar sesión</h2>

      <input
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="Correo"
        required
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />

      <input
        type="password"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        placeholder="Contraseña"
        required
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />

      <button type="submit" style={{ width: '100%' }}>Entrar</button>

      {mensaje && <p style={{ color: 'green', marginTop: '10px' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </form>
  );
}
