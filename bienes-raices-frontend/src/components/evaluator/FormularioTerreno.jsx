import React, { useState } from 'react';

const FormularioTerreno = ({ onDatosIngresados }) => {
  const [datos, setDatos] = useState({
    area: '',
    frente: '',
    fondo: '',
    pendiente: '',
    desnivel: '',
    posicionDesnivel: '',
    geometria: '',
    ubicacionManzana: '',
    distanciaViaPublica: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    const camposVacios = Object.values(datos).some(v => v === '');
    if (camposVacios) {
      alert('Por favor completa todos los campos antes de continuar.');
      return;
    }

    // Enviar datos al componente padre
    onDatosIngresados(datos);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <h5>🧾 Ingreso de características del terreno</h5>

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Área del terreno (m²):</strong></label>
        <input type="number" name="area" value={datos.area} onChange={handleChange} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Frente (m):</strong></label>
        <input type="number" name="frente" value={datos.frente} onChange={handleChange} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Fondo (m):</strong></label>
        <input type="number" name="fondo" value={datos.fondo} onChange={handleChange} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Pendiente (%):</strong></label>
        <input type="number" name="pendiente" value={datos.pendiente} onChange={handleChange} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Desnivel (m):</strong></label>
        <input type="number" name="desnivel" value={datos.desnivel} onChange={handleChange} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Posición del desnivel:</strong></label>
        <select name="posicionDesnivel" value={datos.posicionDesnivel} onChange={handleChange}>
          <option value="">-- Seleccionar --</option>
          <option value="sobre">Sobre nivel</option>
          <option value="bajo">Bajo nivel</option>
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Geometría del terreno:</strong></label>
        <select name="geometria" value={datos.geometria} onChange={handleChange}>
          <option value="">-- Seleccionar --</option>
          <option value="regular">Regular</option>
          <option value="irregular">Irregular</option>
          <option value="triangulo">Triángulo Delta</option>
          <option value="otros">Otros</option>
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Ubicación en la manzana:</strong></label>
        <select name="ubicacionManzana" value={datos.ubicacionManzana} onChange={handleChange}>
          <option value="">-- Seleccionar --</option>
          <option value="esquina_residencial">Esquina residencial</option>
          <option value="esquina_comercial">Esquina comercial</option>
          <option value="medial">Medial</option>
          <option value="interior">Interior</option>
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Distancia a vía pública (m):</strong></label>
        <input type="number" name="distanciaViaPublica" value={datos.distanciaViaPublica} onChange={handleChange} />
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        ✅ Continuar con el cálculo
      </button>
    </form>
  );
};

export default FormularioTerreno;
