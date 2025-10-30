// src/utils/useAuth.js
import { useEffect, useState } from 'react';
import { verifyToken } from '../api/auth';

export function useAuth() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    verifyToken(token)
      .then((res) => {
        console.log('Respuesta verificación:', res.data); // Confirma que viene como "user"
        setUsuario(res.data.user); // ← Aquí debe ser "user"
      })
      .catch((err) => {
        console.error('Error al verificar token:', err);
        localStorage.removeItem('token');
        setUsuario(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return { usuario, loading };
}
