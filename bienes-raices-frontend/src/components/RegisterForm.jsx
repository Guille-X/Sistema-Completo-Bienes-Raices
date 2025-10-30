import { useState } from 'react';
import { register } from '../api/auth';

export default function RegisterForm() {
  const [form, setForm] = useState({
    nombre: '', dpi: '', profesion: '', telefono: '', correo: '', contrasena: '', rol: 'Tecnico'
  });
  const [files, setFiles] = useState({});
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFiles({ ...files, [e.target.name]: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    Object.entries(files).forEach(([key, file]) => formData.append(key, file));

    try {
      await register(formData);
      setMensaje('Registro exitoso. Espera aprobación del administrador.');
    } catch (err) {
      setMensaje(err.response?.data?.error || 'Error al registrar');
    }
  };

  return (
   <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
  <h2>Registro de usuario</h2>
  {['nombre', 'dpi', 'profesion', 'telefono', 'correo', 'contrasena'].map((field) => (
    <input
      key={field}
      name={field}
      type={field === 'contrasena' ? 'password' : 'text'} 
      value={form[field]}
      onChange={handleChange}
      placeholder={field}
      required
      style={{ display: 'block', marginBottom: '10px', width: '100%' }}
    />
  ))}
  <select name="rol" value={form.rol} onChange={handleChange} style={{ display: 'block', marginBottom: '10px' }}>
    <option value="Tecnico">Técnico</option>
    <option value="Evaluador">Evaluador</option>
  </select>
  <input type="file" name="resp_dpi" accept="application/pdf" onChange={handleFileChange} required />
  <input type="file" name="resp_diploma" accept="application/pdf" onChange={handleFileChange} required />
  <input type="file" name="resp_cv" accept="application/pdf" onChange={handleFileChange} required />
  <button type="submit" style={{ marginTop: '10px' }}>Registrarse</button>
  {mensaje && <p style={{ marginTop: '10px', color: 'green' }}>{mensaje}</p>}
</form>

  );
}
