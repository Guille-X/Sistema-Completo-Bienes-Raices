import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Referenciales = () => {
  const [documentosValuados, setDocumentosValuados] = useState([]);
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState(null);
  const [foto, setFoto] = useState(null);
  const [departamento, setDepartamento] = useState('');
  const [municipio, setMunicipio] = useState('');

  const departamentos = {
  "Alta Verapaz": ["Cobán", "San Pedro Carchá", "San Juan Chamelco", "San Cristóbal Verapaz", "Tactic", "Tamahú", "Tucurú", "Panzós", "Senahú", "Cahabón", "Lanquín", "Chahal", "Fray Bartolomé de las Casas", "Chisec", "Santa Cruz Verapaz", "Santa Catalina La Tinta", "Raxruhá"],
  "Baja Verapaz": ["Salamá", "San Miguel Chicaj", "Rabinal", "Cubulco", "Granados", "El Chol", "San Jerónimo", "Purulhá"],
  "Chimaltenango": ["Chimaltenango", "San José Poaquil", "San Martín Jilotepeque", "Comalapa", "Santa Apolonia", "Tecpán Guatemala", "Patzún", "Pochuta", "Patzicía", "Santa Cruz Balanyá", "Acatenango", "Yepocapa", "San Andrés Itzapa", "Parramos", "Zaragoza", "El Tejar"],
  "Chiquimula": ["Chiquimula", "San José La Arada", "San Juan Ermita", "Jocotán", "Camotán", "Olopa", "Esquipulas", "Concepción Las Minas", "Quezaltepeque", "San Jacinto", "Ipala"],
  "El Progreso": ["Guastatoya", "Morazán", "San Agustín Acasaguastlán", "San Cristóbal Acasaguastlán", "El Jícaro", "Sansare", "Sanarate", "San Antonio La Paz"],
  "Escuintla": ["Escuintla", "Santa Lucía Cotzumalguapa", "La Democracia", "Siquinalá", "Masagua", "Tiquisate", "La Gomera", "Guanagazapa", "San José", "Iztapa", "Palín", "San Vicente Pacaya", "Nueva Concepción"],
  "Guatemala": ["Guatemala", "Santa Catarina Pinula", "San José Pinula", "Mixco", "Villa Nueva", "Villa Canales", "Petapa", "Amatitlán", "Fraijanes", "San Raymundo", "Chinautla", "Chuarrancho", "San Pedro Ayampuc", "San Pedro Sacatepéquez", "San Juan Sacatepéquez"],
  "Huehuetenango": ["Huehuetenango", "Chiantla", "Malacatancito", "Cuilco", "Nentón", "San Pedro Necta", "Jacaltenango", "Soloma", "San Ildefonso Ixtahuacán", "Santa Bárbara", "La Libertad", "La Democracia", "San Miguel Acatán", "San Rafael La Independencia", "Todos Santos Cuchumatán", "San Juan Atitán", "Santa Eulalia", "San Mateo Ixtatán", "Colotenango", "San Sebastián Huehuetenango", "Tectitán", "Concepción Huista", "San Juan Ixcoy", "San Antonio Huista", "San Sebastián Coatán", "Barillas", "Aguacatán", "San Rafael Petzal", "San Gaspar Ixchil", "Santiago Chimaltenango", "Santa Ana Huista", "Unión Cantinil"],
  "Izabal": ["Puerto Barrios", "Livingston", "El Estor", "Morales", "Los Amates"],
  "Jalapa": ["Jalapa", "San Pedro Pinula", "San Luis Jilotepeque", "San Manuel Chaparrón", "San Carlos Alzatate", "Monjas", "Mataquescuintla"],
  "Jutiapa": ["Jutiapa", "El Progreso", "Santa Catarina Mita", "Agua Blanca", "Asunción Mita", "Yupiltepeque", "Atescatempa", "Jerez", "El Adelanto", "Zapotitlán", "Comapa", "Jalpatagua", "Conguaco", "Moyuta", "Pasaco", "San José Acatempa", "Quesada"],
  "Petén": ["Flores", "San José", "San Benito", "San Andrés", "La Libertad", "San Francisco", "Santa Ana", "Dolores", "San Luis", "Sayaxché", "Melchor de Mencos", "Poptún", "Las Cruces", "El Chal"],
  "Quetzaltenango": ["Quetzaltenango", "Salcajá", "Olintepeque", "San Carlos Sija", "Sibilia", "Cabricán", "Cajolá", "San Miguel Siguilá", "Ostuncalco", "San Mateo", "Concepción Chiquirichapa", "San Martín Sacatepéquez", "Almolonga", "Cantel", "Huitán", "Zunil", "Colomba", "San Francisco La Unión", "El Palmar", "Coatepeque", "Génova", "Flores Costa Cuca", "La Esperanza", "Palestina de Los Altos"],
  "Quiché": ["Santa Cruz del Quiché", "Chiché", "Chinique", "Zacualpa", "Chajul", "Chichicastenango", "Patzité", "San Antonio Ilotenango", "San Pedro Jocopilas", "Cunén", "San Juan Cotzal", "Joyabaj", "Nebaj", "San Andrés Sajcabajá", "Uspantán", "Sacapulas", "San Bartolomé Jocotenango", "Canillá", "Chicamán", "Ixcán", "Pachalum"],
  "Retalhuleu": ["Retalhuleu", "San Sebastián", "Santa Cruz Muluá", "San Martín Zapotitlán", "San Felipe", "San Andrés Villa Seca", "Champerico", "Nuevo San Carlos", "El Asintal"],
  "Sacatepéquez": ["Antigua Guatemala", "Jocotenango", "Pastores", "Sumpango", "Santo Domingo Xenacoj", "Santiago Sacatepéquez", "San Bartolomé Milpas Altas", "San Lucas Sacatepéquez", "Santa Lucía Milpas Altas", "Magdalena Milpas Altas", "Santa María de Jesús", "Ciudad Vieja", "San Miguel Dueñas", "Alotenango", "San Antonio Aguas Calientes", "Santa Catarina Barahona"],
  "San Marcos": ["San Marcos", "San Pedro Sacatepéquez", "San Antonio Sacatepéquez", "Comitancillo", "San Miguel Ixtahuacán", "Concepción Tutuapa", "Tacaná", "Sibinal", "Tajumulco", "Tejutla", "San Rafael Pie de La Cuesta", "Nuevo Progreso", "El Tumbador", "El Rodeo", "Malacatán", "Catarina", "Ayutla", "Ocós", "San Pablo", "El Quetzal", "La Reforma", "Pajapita", "Ixchiguán", "San José Ojetenam", "San Cristóbal Cucho", "Sipacapa", "Esquipulas Palo Gordo", "Río Blanco", "San Lorenzo"],
  "Santa Rosa": ["Cuilapa", "Barberena", "Santa Rosa de Lima", "Casillas", "San Rafael Las Flores", "Oratorio", "San Juan Tecuaco", "Chiquimulilla", "Taxisco", "Santa María Ixhuatán", "Guazacapán", "Santa Cruz Naranjo", "Pueblo Nuevo Viñas", "Nueva Santa Rosa"],
  "Sololá": ["Sololá", "San José Chacayá", "Santa María Visitación", "Santa Lucía Utatlán", "Nahualá", "Santa Catarina Ixtahuacán", "Santa Clara La Laguna", "Concepción", "San Andrés Semetabaj", "Panajachel", "Santa Catarina Palopó", "San Antonio Palopó", "San Lucas Tolimán", "Santa Cruz La Laguna", "San Pablo La Laguna", "San Marcos La Laguna", "San Juan La Laguna", "San Pedro La Laguna", "Santiago Atitlán"],
  "Suchitepéquez": ["Mazatenango", "Cuyotenango", "San Francisco Zapotitlán", "San Bernardino", "San José El Idolo", "Santo Domingo Suchitepéquez", "San Lorenzo", "Samayac", "San Pablo Jocopilas", "San Antonio Suchitepéquez", "San Miguel Panán", "San Gabriel", "Chicacao", "Patulul", "Santa Bárbara", "San Juan Bautista", "Santo Tomás La Unión", "Zunilito", "Pueblo Nuevo", "Río Bravo"],
  "Totonicapán": ["Totonicapán", "San Cristóbal Totonicapán", "San Francisco El Alto", "San Andrés Xecul", "Momostenango", "Santa María Chiquimula", "Santa Lucía La Reforma", "San Bartolo"],
  "Zacapa": ["Zacapa", "Estanzuela", "Río Hondo", "Gualán", "Teculután", "Usumatlán", "Cabañas", "San Diego", "La Unión", "Huité"]
};





  const [referencial, setReferencial] = useState({
    link_fuente: '',
    valor_total: '',
    area_terreno: '',
    area_construccion: '',
    valor_construccion: ''
  });

  const [referenciales, setReferenciales] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/legal/factores/documentos-valuados')
      .then(res => setDocumentosValuados(res.data))
      .catch(err => console.error('Error al cargar documentos valuados:', err));
  }, []);

  useEffect(() => {
    if (documentoSeleccionado) {
      axios.get(`http://localhost:3000/api/legal/referenciales/${documentoSeleccionado.tipo_documento}/${documentoSeleccionado.id_documento}`)
        .then(res => setReferenciales(res.data))
        .catch(err => console.error('Error al cargar referenciales:', err));
    }
  }, [documentoSeleccionado]);

  const calcularValorSuelo = () => {
    const { valor_total, valor_construccion, area_terreno } = referencial;
    const suelo = parseFloat(valor_total || 0) - parseFloat(valor_construccion || 0);
    const suelo_m2 = suelo / parseFloat(area_terreno || 1);
    return {
      valor_suelo: suelo.toFixed(2),
      valor_suelo_m2: suelo_m2.toFixed(2)
    };
  };

  const handleChange = (e) => {
    setReferencial({ ...referencial, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const guardarReferencial = async () => {
    if (!documentoSeleccionado) return alert('Selecciona un documento valuado primero');

    const data = new FormData();
    data.append('id_documento', documentoSeleccionado.id_documento);
    data.append('tipo_documento', documentoSeleccionado.tipo_documento);
    data.append('departamento', departamento);
    data.append('municipio', municipio);
    Object.entries(referencial).forEach(([key, value]) => data.append(key, value));
    if (foto) data.append('foto', foto);
    
    try {
      await axios.post('http://localhost:3000/api/legal/referenciales/registrar', data);
      alert('Referencial guardado');
      setReferencial({
        link_fuente: '',
        valor_total: '',
        area_terreno: '',
        area_construccion: '',
        valor_construccion: ''
      });
      setFoto(null);
      const res = await axios.get(`http://localhost:3000/api/legal/referenciales/${documentoSeleccionado.tipo_documento}/${documentoSeleccionado.id_documento}`);
      setReferenciales(res.data);
    } catch (err) {
      console.error('Error al guardar referencial:', err);
      alert('No se pudo guardar');
    }
  };

  const { valor_suelo, valor_suelo_m2 } = calcularValorSuelo();

  return (
    <div style={{ marginTop: '2rem' }}>
      <h4>🏘️ Comparables referenciales</h4>

      <label>Selecciona un documento valuado:</label>
      <select onChange={(e) => {
        const [tipo, id] = e.target.value.split('|');
        setDocumentoSeleccionado({ tipo_documento: tipo, id_documento: parseInt(id) });
      }}>
        <option value="">— Seleccionar —</option>
        {documentosValuados.map(doc => (
          <option key={`${doc.tipo_documento}-${doc.id_documento}`} value={`${doc.tipo_documento}|${doc.id_documento}`}>
            {doc.tipo_documento} #{doc.id_documento}
          </option>
        ))}
      </select>

      {documentoSeleccionado && (
        <>
          <h5 style={{ marginTop: '1rem' }}>📋 Registrar nuevo referencial</h5>
          <div style={{ display: 'grid', gap: '0.5rem', maxWidth: '600px' }}>
            <input name="link_fuente" placeholder="Link de la oferta" value={referencial.link_fuente} onChange={handleChange} />
            <input name="valor_total" placeholder="Valor total del inmueble" value={referencial.valor_total} onChange={handleChange} type="number" />
            <input name="area_terreno" placeholder="Área del terreno (m²)" value={referencial.area_terreno} onChange={handleChange} type="number" />
            <input name="area_construccion" placeholder="Área construida (m²)" value={referencial.area_construccion} onChange={handleChange} type="number" />
            <input name="valor_construccion" placeholder="Valor de construcción" value={referencial.valor_construccion} onChange={handleChange} type="number" />
            <select value={departamento} onChange={(e) => {setDepartamento(e.target.value);setMunicipio(''); // resetear municipio al cambiar departamento
            }}>
            <option value="">— Selecciona departamento —</option>
            {Object.keys(departamentos).map(dep => (
            <option key={dep} value={dep}>{dep}</option>
            ))}
            </select>

            {departamento && (
            <select value={municipio} onChange={(e) => setMunicipio(e.target.value)}>
            <option value="">— Selecciona municipio —</option>
            {departamentos[departamento].map(muni => (
            <option key={muni} value={muni}>{muni}</option>
            ))}
            </select>
            )}

            <div className="file-input-container">
            <label htmlFor="foto" className="file-label">
            📷 Seleccionar Imagen...
            </label>
            <input 
            type="file" 
            id="foto"
            name="foto" 
            accept="image/*" 
            onChange={handleFileChange}
            className="file-input"
            />
            </div>
            <div>💡 Valor del suelo: <strong>Q{valor_suelo}</strong></div>
            <div>💡 Valor del suelo/m²: <strong>Q{valor_suelo_m2}</strong></div>
            <button onClick={guardarReferencial}>Guardar referencial</button>
          </div>

          {referenciales.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h5>📁 Referenciales registrados</h5>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th>Link</th>
                    <th>Valor total</th>
                    <th>Área terreno</th>
                    <th>Área construcción</th>
                    <th>Valor construcción</th>
                    <th>Valor suelo</th>
                    <th>Valor suelo/m²</th>
                    <th>Departamento</th>
                    <th>Municipio</th>
                    <th>Foto</th>
                  </tr>
                </thead>
                <tbody>
                  {referenciales.map((r) => (
                    <tr key={r.id}>
                      <td><a href={r.link_fuente} target="_blank" rel="noreferrer">Ver</a></td>
                      <td>Q{r.valor_total}</td>
                      <td>{r.area_terreno} m²</td>
                      <td>{r.area_construccion} m²</td>
                      <td>Q{r.valor_construccion}</td>
                      <td>Q{r.valor_suelo}</td>
                      <td>Q{r.valor_suelo_m2}</td>
                      <td>{r.departamento}</td>
                      <td>{r.municipio}</td>
                      <td>{r.foto_path ? (<a href={`http://localhost:3000${r.foto_path}`} target="_blank" rel="noreferrer">
                      <button className="foto-btn">
                      <span className="foto-icon">🖼️</span>
                      Ver Foto
                      </button>
                      </a>) : ('—')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Referenciales;
