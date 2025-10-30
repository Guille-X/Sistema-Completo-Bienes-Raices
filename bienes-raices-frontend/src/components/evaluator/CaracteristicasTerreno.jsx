import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormularioTerreno from "./FormularioTerreno";

const CaracteristicasTerreno = () => {
  const [documentos, setDocumentos] = useState([]);
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState(null);
  const [datosTerreno, setDatosTerreno] = useState(null);
  const [factores, setFactores] = useState(null);
  const [resumen, setResumen] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/legal/factores/documentos/aprobados')
      .then(res => setDocumentos(res.data))
      .catch(err => console.error('Error al cargar documentos:', err));

    axios.get('http://localhost:3000/api/legal/factores/resumen')
      .then(res => setResumen(res.data))
      .catch(err => console.error('Error al cargar resumen:', err));
  }, []);

  const calcularFactores = (datos) => {
  const f = {};

  const area = parseFloat(datos.area);
  f.factor_area = area <= 1000 ? 0.85 : area <= 3000 ? 0.91 : area <= 5000 ? 0.95 : 1.00;

  const frente = parseFloat(datos.frente);
  f.factor_frente = frente <= 10 ? 0.80 : frente <= 20 ? 0.90 : 1.00;

  const fondo = parseFloat(datos.fondo);
  f.factor_fondo = fondo <= 15 ? 0.75 : fondo <= 30 ? 0.85 : 1.00;

  const pendiente = parseFloat(datos.pendiente);
  f.factor_pendiente = pendiente <= 5 ? 1.00 : pendiente <= 15 ? 0.90 : 0.80;

  const desnivel = parseFloat(datos.desnivel);
  const posicion = datos.posicionDesnivel;
  f.factor_desnivel = posicion === 'bajo'
    ? desnivel <= 1 ? 0.95 : desnivel <= 3 ? 0.82 : 0.70
    : desnivel <= 1 ? 1.00 : desnivel <= 3 ? 0.90 : 0.80;

  switch (datos.geometria) {
    case 'regular': f.factor_geometria = 1.00; break;
    case 'irregular': f.factor_geometria = 0.90; break;
    case 'triangulo': f.factor_geometria = 0.85; break;
    default: f.factor_geometria = 0.80;
  }

  switch (datos.ubicacionManzana) {
    case 'esquina_residencial': f.factor_ubicacion = 1.10; break;
    case 'esquina_comercial': f.factor_ubicacion = 1.15; break;
    case 'medial': f.factor_ubicacion = 1.00; break;
    case 'interior': f.factor_ubicacion = 0.90; break;
    default: f.factor_ubicacion = 1.00;
  }

  const distancia = parseFloat(datos.distanciaViaPublica);
  f.factor_viaPublica = distancia <= 20 ? 1.00 : distancia <= 50 ? 0.90 : 0.80;

  f.factor_total = parseFloat(Object.values(f).reduce((acc, val) => acc * val, 1).toFixed(3));
  return f;
};

  const handleDatosTerreno = (datos) => {
    const factoresCalculados = calcularFactores(datos);
    setDatosTerreno(datos);
    setFactores(factoresCalculados);
  };

  const guardarFactores = async () => {
    if (!factores || !documentoSeleccionado) {
      alert('Faltan datos o documento seleccionado');
      return;
    }

    const payload = {
      tipo_documento: documentoSeleccionado.tipo_documento,
      id_documento: documentoSeleccionado.id,
      evaluador: 'Evaluador de prueba',
      ...datosTerreno,
      ...factores
    };

    console.log('Payload enviado:', payload);

    try {
      console.log('Payload enviado:', payload);
      await axios.post('http://localhost:3000/api/legal/factores/registrar', payload);
      alert('Factores guardados correctamente');
    } catch (err) {
      console.error('Error al guardar factores:', err);
      alert('No se pudo guardar');
    }
  };

  const documentoYaEvaluado = () => {
  if (!documentoSeleccionado) return false;
  return resumen.some(r =>
    r.tipo_documento === documentoSeleccionado.tipo_documento &&
    r.id_documento === documentoSeleccionado.id
  );
};


  return (
    <div>
      <h4>📐 Módulo de características del terreno</h4>
      <p>Selecciona un documento y luego ingresa los datos técnicos para calcular los factores de ajuste.</p>

      <div style={{ marginBottom: '1rem' }}>
        <label><strong>Documentos aprobados: </strong></label>
        <select onChange={async (e) => {
          const [tipo, id] = e.target.value.split('-');
          const docBase = documentos.find(d => d.id === parseInt(id) && d.tipo_documento === tipo);
          setDocumentoSeleccionado(null);

          if (docBase) {
            try {
              const res = await axios.get(`http://localhost:3000/api/legal/factores/documentos/detalle/${tipo}/${id}`);
              const detalle = res.data;
              setDocumentoSeleccionado({ ...docBase, ...detalle });
            } catch (err) {
              console.error('Error al cargar detalle del documento:', err);
              alert('No se pudo cargar el detalle del documento');
            }
          }
        }}>
          <option value="">-- Seleccionar documento --</option>
          {documentos.map(doc => (
            <option key={`${doc.tipo_documento}-${doc.id}`} value={`${doc.tipo_documento}-${doc.id}`}>
              {doc.tipo_documento} #{doc.id} – {doc.nombre}
            </option>
          ))}
        </select>
      </div>

      {documentoSeleccionado && (
        <div style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
          <h5>📄 Vista previa del documento seleccionado</h5>
          <p><strong>Nombre:</strong> {documentoSeleccionado.nombre}</p>
          <p><strong>Área:</strong> {documentoSeleccionado.area} m²</p>
          <p><strong>Dirección:</strong> {documentoSeleccionado.direccion}</p>

          {documentoSeleccionado.documento_path ? (
            <a
              href={`http://localhost:3000/uploads/${encodeURIComponent(documentoSeleccionado.documento_path)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#17a2b8',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px'
              }}
            >
              📎 Ver documento PDF
            </a>
          ) : (
            <p style={{ color: 'red' }}>⚠️ Este documento no tiene archivo PDF adjunto.</p>
          )}

          <FormularioTerreno onDatosIngresados={handleDatosTerreno} />
        </div>
      )}
      {factores && (
        <div style={{ marginTop: '1rem' }}>
          <h5>📊 Resumen de factores calculados</h5>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Característica</th>
                <th>Factor</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(factores).map(([key, val]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {documentoYaEvaluado() ? (
  <p style={{ color: 'red', marginTop: '1rem' }}>
    ⚠️ Este documento ya fue evaluado. No se puede registrar nuevamente.
  </p>
) : (
  <button
    onClick={guardarFactores}
    style={{
      backgroundColor: '#28a745',
      color: 'white',
      marginTop: '1rem',
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '4px'
    }}
  >
    💾 Guardar factores
  </button>
)}

        </div>
      )}
      {resumen.length > 0 && (
  <div style={{ marginTop: '2rem' }}>
    <h5>📁 Historial de factores registrados</h5>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Documento</th>
          <th>Evaluador</th>
          <th>Área</th>
          <th>Frente</th>
          <th>Fondo</th>
          <th>Pendiente</th>
          <th>Desnivel</th>
          <th>Geometría</th>
          <th>Ubicación</th>
          <th>Factor total</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {resumen.map((r) => (
          <tr key={`${r.tipo_documento}-${r.id_documento}`}>
            <td>{r.tipo_documento} #{r.id_documento}</td>
            <td>{r.evaluador}</td>
            <td>{r.area}</td>
            <td>{r.frente}</td>
            <td>{r.fondo}</td>
            <td>{r.pendiente}</td>
            <td>{r.desnivel}</td>
            <td>{r.geometria}</td>
            <td>{r.ubicacionManzana}</td>
            <td>{r.factor_total}</td>
            <td>{new Date(r.fecha_registro).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

    </div>
  );
};

export default CaracteristicasTerreno;
