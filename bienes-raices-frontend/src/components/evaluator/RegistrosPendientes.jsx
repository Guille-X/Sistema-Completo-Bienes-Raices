import React from 'react';

const RegistrosPendientes = ({
  certificacionesPendientes,
  escriturasPendientes,
  actualizarEstado,
  actualizarEstadoEscritura
}) => (
  <>
    <hr style={{ margin: '2rem 0' }} />
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
      {/* Certificaciones */}
      <div style={{ flex: 1 }}>
        <h4>📋 Certificaciones</h4>
        {certificacionesPendientes.length === 0 ? (
          <p>No hay certificaciones pendientes</p>
        ) : (
          certificacionesPendientes.map((c) => (
            <div key={c.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '6px' }}>
              <p><strong>Propietario:</strong> {c.propietario}</p>
              <p><strong>Fecha:</strong> {c.fecha}</p>
              <p><strong>Área:</strong> {c.area} m²</p>
              <p><strong>Dirección:</strong> {c.direccion}</p>
              <p><strong>Colindancias:</strong> {c.colindancias}</p>
              <p><strong>Orientaciones:</strong> {c.orientacion_medida_colindante}</p>
              <p><strong>Documento:</strong> <a href={`http://localhost:3000/uploads/${c.documento_path}`} target="_blank" rel="noopener noreferrer">Ver PDF</a></p>
              <button onClick={() => actualizarEstado(c.id, 'aprobado')} style={{ marginRight: '1rem', backgroundColor: '#5cb85c', color: 'white', padding: '0.4rem 0.8rem', border: 'none', borderRadius: '4px' }}>✅ Aprobar</button>
              <button onClick={() => actualizarEstado(c.id, 'rechazado')} style={{ backgroundColor: '#d9534f', color: 'white', padding: '0.4rem 0.8rem', border: 'none', borderRadius: '4px' }}>❌ Rechazar</button>
            </div>
          ))
        )}
      </div>

      {/* Escrituras */}
      <div style={{ flex: 1 }}>
        <h4>📜 Escrituras</h4>
        {escriturasPendientes.length === 0 ? (
          <p>No hay escrituras pendientes</p>
        ) : (
          escriturasPendientes.map((e) => (
            <div key={e.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '6px' }}>
              <p><strong>Poseedor:</strong> {e.poseedor}</p>
              <p><strong>Escritura No.:</strong> {e.numero_escritura}</p>
              <p><strong>Abogado:</strong> {e.abogado}</p>
              <p><strong>Área:</strong> {e.area} m²</p>
              <p><strong>Dirección:</strong> {e.direccion}</p>
              <p><strong>Colindancias:</strong> {e.colindancias}</p>
              <p><strong>Documento:</strong> <a href={`http://localhost:3000/uploads/${e.documento_path}`} target="_blank" rel="noopener noreferrer">Ver PDF</a></p>
              <button onClick={() => actualizarEstadoEscritura(e.id, 'aprobado')} style={{ marginRight: '1rem', backgroundColor: '#5cb85c', color: 'white', padding: '0.4rem 0.8rem', border: 'none', borderRadius: '4px' }}>✅ Aprobar</button>
              <button onClick={() => actualizarEstadoEscritura(e.id, 'rechazado')} style={{ backgroundColor: '#d9534f', color: 'white', padding: '0.4rem 0.8rem', border: 'none', borderRadius: '4px' }}>❌ Rechazar</button>
            </div>
          ))
        )}
      </div>
    </div>
  </>
);

export default RegistrosPendientes;
