import React from 'react';

const HeronCalculator = ({ formData, handleChange, calcularAreaHeron, areaCalculada }) => (
  <>
    <hr style={{ margin: '2rem 0' }} />
    <h3>📐 ¿No tienes el área? Calcula con fórmula de Herón</h3>
    <div style={{ display: 'grid', gap: '10px', marginBottom: '1rem' }}>
      <input name="ladoA" placeholder="Lado A" value={formData.ladoA || ''} onChange={handleChange} />
      <input name="ladoB" placeholder="Lado B" value={formData.ladoB || ''} onChange={handleChange} />
      <input name="ladoC" placeholder="Lado C" value={formData.ladoC || ''} onChange={handleChange} />
      <button onClick={calcularAreaHeron} style={{ backgroundColor: '#5cb85c', color: 'white', padding: '0.5rem', border: 'none', borderRadius: '4px' }}>
        Calcular Área
      </button>
    </div>
    {areaCalculada && (
      <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
        Área calculada: {areaCalculada.toFixed(2)} m²
      </p>
    )}
  </>
);

export default HeronCalculator;
