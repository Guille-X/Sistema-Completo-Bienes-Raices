import React from 'react';

const RegistroDocumento = ({
  tipoDocumento, setTipoDocumento,
  formData, setFormData,
  archivo, setArchivo,
  colindancias, setColindancias,
  orientaciones, setOrientaciones,
  handleSubmit,
  handleChange, handleFileChange,
  addColindancia, removeColindancia, updateColindancia,
  addOrientacion, removeOrientacion, updateOrientacion
}) => (
  <>
    <label style={{ fontWeight: 'bold' }}>Tipo de documento:</label>
    <select onChange={(e) => setTipoDocumento(e.target.value)} value={tipoDocumento} style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}>
      <option value="certificacion">Certificación de Registro</option>
      <option value="escritura">Escritura Pública</option>
    </select>

    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
      {tipoDocumento === 'certificacion' ? (
        <>
          <input type="date" name="fecha" value={formData.fecha || ''} onChange={handleChange} required />
          <input name="propietario" placeholder="Nombre del propietario" value={formData.propietario || ''} onChange={handleChange} required />
          <input name="area" placeholder="Área (m²)" value={formData.area || ''} onChange={handleChange} required />
          <input name="direccion" placeholder="Dirección" value={formData.direccion || ''} onChange={handleChange} required />
        </>
      ) : (
        <>
          <input name="numero_escritura" placeholder="Número de escritura" value={formData.numero_escritura || ''} onChange={handleChange} required />
          <input name="abogado" placeholder="Abogado que fracciona" value={formData.abogado || ''} onChange={handleChange} required />
          <input name="poseedor" placeholder="Nombre del poseedor" value={formData.poseedor || ''} onChange={handleChange} required />
          <input name="area" placeholder="Área (m²)" value={formData.area || ''} onChange={handleChange} required />
          <input name="direccion" placeholder="Dirección" value={formData.direccion || ''} onChange={handleChange} required />
        </>
      )}

      <div>
        <label style={{ fontWeight: 'bold' }}>Colindancias:</label>
        {colindancias.map((c, i) => (
          <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
            <input
              value={c}
              onChange={(e) => updateColindancia(i, e.target.value)}
              placeholder={`Colindancia ${i + 1}`}
              style={{ flex: 1 }}
            />
            <button type="button" onClick={() => removeColindancia(i)} style={{ backgroundColor: '#ffc107', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '4px' }}>
              ❌
            </button>
          </div>
        ))}
        <button type="button" onClick={addColindancia} style={{ marginTop: '5px' }}>➕ Agregar colindancia</button>
      </div>

      {tipoDocumento === 'certificacion' && (
        <div>
          <label style={{ fontWeight: 'bold' }}>Orientación, medida y colindante:</label>
          {orientaciones.map((o, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
              <input
                value={o}
                onChange={(e) => updateOrientacion(i, e.target.value)}
                placeholder={`Orientación ${i + 1}`}
                style={{ flex: 1 }}
              />
              <button type="button" onClick={() => removeOrientacion(i)} style={{ backgroundColor: '#ffc107', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '4px' }}>
                ❌
              </button>
            </div>
          ))}
          <button type="button" onClick={addOrientacion} style={{ marginTop: '5px' }}>➕ Agregar orientación</button>
        </div>
      )}

      <input type="file" onChange={handleFileChange} required />
      <button type="submit" style={{
        backgroundColor: '#007bff',
        color: 'white',
        padding: '0.6rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        📤 Registrar Documento
      </button>
    </form>
  </>
);

export default RegistroDocumento;
