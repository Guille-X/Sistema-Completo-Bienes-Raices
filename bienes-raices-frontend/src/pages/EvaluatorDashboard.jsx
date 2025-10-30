import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RegistroDocumento from '../components/evaluator/RegistroDocumento';
import HeronCalculator from '../components/evaluator/HeronCalculator';
import RegistrosPendientes from '../components/evaluator/RegistrosPendientes';
import CaracteristicasTerreno from '../components/evaluator/CaracteristicasTerreno';
import Referenciales from '../components/evaluator/Referenciales';


const api = axios.create({
  baseURL: 'http://localhost:3000/api/legal'
});

const EvaluatorDashboard = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState('registro');

  const [tipoDocumento, setTipoDocumento] = useState('certificacion');
  const [formData, setFormData] = useState({});
  const [archivo, setArchivo] = useState(null);
  const [areaCalculada, setAreaCalculada] = useState(null);
  const [colindancias, setColindancias] = useState(['']);
  const [orientaciones, setOrientaciones] = useState(['']);
  const [certificacionesPendientes, setCertificacionesPendientes] = useState([]);
  const [escriturasPendientes, setEscriturasPendientes] = useState([]);
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState(null);

  useEffect(() => {
    api.get('/certificaciones/pendientes')
      .then(res => setCertificacionesPendientes(res.data))
      .catch(err => console.error('Error al cargar certificaciones:', err));

    api.get('/escrituras/pendientes')
      .then(res => setEscriturasPendientes(res.data))
      .catch(err => console.error('Error al cargar escrituras:', err));
  }, []);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleFileChange = (e) => setArchivo(e.target.files[0]);
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (archivo) data.append('documento', archivo);
      data.append('colindancias', colindancias.filter(c => c.trim()).join('; '));
      data.append('orientacion_medida_colindante', orientaciones.filter(o => o.trim()).join('; '));

      const endpoint = tipoDocumento === 'certificacion' ? '/certificacion' : '/escritura';
      const res = await api.post(endpoint, data);
      alert(res.data.mensaje);

      setFormData({});
      setArchivo(null);
      setColindancias(['']);
      setOrientaciones(['']);
      setAreaCalculada(null);
    } catch (error) {
      console.error('Error al registrar documento:', error);
      alert('Hubo un problema al registrar el documento.');
    }
  };

  const calcularAreaHeron = async () => {
    try {
      const { ladoA, ladoB, ladoC } = formData;
      const res = await api.post('/calcular_area', {
        a: parseFloat(ladoA),
        b: parseFloat(ladoB),
        c: parseFloat(ladoC)
      });
      setAreaCalculada(res.data.area_calculada);
    } catch (error) {
      console.error('Error al calcular área:', error);
      alert('Hubo un problema al calcular el área.');
    }
  };

  const addColindancia = () => setColindancias([...colindancias, '']);
  const removeColindancia = (i) => setColindancias(colindancias.filter((_, index) => index !== i));
  const updateColindancia = (i, value) => {
    const updated = [...colindancias];
    updated[i] = value;
    setColindancias(updated);
  };

  const addOrientacion = () => setOrientaciones([...orientaciones, '']);
  const removeOrientacion = (i) => setOrientaciones(orientaciones.filter((_, index) => index !== i));
  const updateOrientacion = (i, value) => {
    const updated = [...orientaciones];
    updated[i] = value;
    setOrientaciones(updated);
  };

  const actualizarEstado = async (id, estado) => {
    try {
      await api.post('/certificaciones/estado', { id, estado });
      setCertificacionesPendientes(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error al actualizar estado:', err);
    }
  };

  const actualizarEstadoEscritura = async (id, estado) => {
    try {
      await api.post('/escrituras/estado', { id, estado });
      setEscriturasPendientes(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error('Error al actualizar estado de escritura:', err);
    }
  };

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '2rem auto',
      fontFamily: 'Segoe UI, sans-serif',
      padding: '1rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.05)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Valuador</h2>
        <button onClick={handleLogout} style={{
          backgroundColor: '#dc3545',
          color: 'white',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          🔒 Cerrar sesión
        </button>
      </div>

      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3" fill>
        <Tab eventKey="registro" title="📄 Registro de documentos">
          <RegistroDocumento
            tipoDocumento={tipoDocumento}
            setTipoDocumento={setTipoDocumento}
            formData={formData}
            setFormData={setFormData}
            archivo={archivo}
            setArchivo={setArchivo}
            colindancias={colindancias}
            setColindancias={setColindancias}
            orientaciones={orientaciones}
            setOrientaciones={setOrientaciones}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            addColindancia={addColindancia}
            removeColindancia={removeColindancia}
            updateColindancia={updateColindancia}
            addOrientacion={addOrientacion}
            removeOrientacion={removeOrientacion}
            updateOrientacion={updateOrientacion}
          />
        </Tab>

        <Tab eventKey="heron" title="🧰 Cálculo de área">
          <HeronCalculator
            formData={formData}
            handleChange={handleChange}
            calcularAreaHeron={calcularAreaHeron}
            areaCalculada={areaCalculada}
          />
        </Tab>

        <Tab eventKey="pendientes" title="📂 Registros pendientes">
          <RegistrosPendientes
            certificacionesPendientes={certificacionesPendientes}
            escriturasPendientes={escriturasPendientes}
            actualizarEstado={actualizarEstado}
            actualizarEstadoEscritura={actualizarEstadoEscritura}
          />
        </Tab>

        <Tab eventKey="terreno" title="📐 Características del Terreno">
          <CaracteristicasTerreno 

          documentoSeleccionado={documentoSeleccionado}
          setDocumentoSeleccionado={setDocumentoSeleccionado}
          
          />

        </Tab>

        <Tab eventKey="referenciales" title="🏘️ Comparables referenciales">
        <Referenciales />
        </Tab>


        {/* Puedes agregar más pestañas aquí */}
        {/* <Tab eventKey="historial" title="📊 Historial de registros">...</Tab> */}
      </Tabs>
    </div>
  );
};

export default EvaluatorDashboard;
