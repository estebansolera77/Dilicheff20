import { useState, useEffect } from 'react';
import axios from 'axios';

function Lote() {
  const [lotes, setLotes] = useState([]);
  const [buscar, setBuscar] = useState('');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [loteEditar, setLoteEditar] = useState(null);
  const [animalesLote, setAnimalesLote] = useState([]);
  const [loteSeleccionado, setLoteSeleccionado] = useState(null);
  const [form, setForm] = useState({
    nombre: '', descripcion: '', fecha_creacion: ''
  });

  useEffect(() => {
    cargarLotes();
  }, []);

  const cargarLotes = async () => {
    const res = await axios.get('http://localhost:3000/api/lote');
    setLotes(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    if (loteEditar) {
      await axios.put(`http://localhost:3000/api/lote/${loteEditar.id_lote}`, form);
    } else {
      await axios.post('http://localhost:3000/api/lote', form);
    }
    setMostrarForm(false);
    setLoteEditar(null);
    setForm({ nombre: '', descripcion: '', fecha_creacion: '' });
    cargarLotes();
  };

  const handleEditar = (lote) => {
    setLoteEditar(lote);
    setForm({
      nombre: lote.nombre,
      descripcion: lote.descripcion,
      fecha_creacion: lote.fecha_creacion.split('T')[0]
    });
    setMostrarForm(true);
  };

  const verAnimales = async (lote) => {
    const res = await axios.get(`http://localhost:3000/api/animal/lote/${lote.id_lote}`);
    setAnimalesLote(res.data);
    setLoteSeleccionado(lote);
  };

  const lotesFiltrados = lotes.filter(l =>
    l.nombre.toLowerCase().includes(buscar.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Lotes</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            className="buscador"
            placeholder="Buscar por nombre..."
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
          />
          <button className="btn-crear" onClick={() => setMostrarForm(true)}>+ Nuevo Lote</button>
        </div>
      </div>

      {mostrarForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{loteEditar ? 'Editar Lote' : 'Nuevo Lote'}</h3>
              <button className="modal-cerrar" onClick={() => setMostrarForm(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="campo ancho-completo">
                <label>Nombre</label>
                <input name="nombre" placeholder="Ej: Lote 1" value={form.nombre} onChange={handleChange} />
              </div>
              <div className="campo ancho-completo">
                <label>Descripción</label>
                <input name="descripcion" placeholder="Descripción del lote" value={form.descripcion} onChange={handleChange} />
              </div>
              <div className="campo ancho-completo">
                <label>Fecha Creación</label>
                <input name="fecha_creacion" type="date" value={form.fecha_creacion} onChange={handleChange} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancelar" onClick={() => setMostrarForm(false)}>Cancelar</button>
              <button className="btn-guardar" onClick={handleGuardar}>{loteEditar ? 'Actualizar' : 'Guardar'}</button>
            </div>
          </div>
        </div>
      )}

      <table className="tabla-animal">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Fecha Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lotesFiltrados.map(lote => (
            <tr key={lote.id_lote}>
              <td>{lote.nombre}</td>
              <td>{lote.descripcion}</td>
              <td>{new Date(lote.fecha_creacion).toLocaleDateString()}</td>
              <td style={{ display: 'flex', gap: '8px' }}>
                <button className="btn-editar" onClick={() => handleEditar(lote)}>Editar</button>
                <button className="btn-ver" onClick={() => verAnimales(lote)}>Ver animales</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {loteSeleccionado && (
        <div style={{ marginTop: '30px' }}>
          <h3>Animales en {loteSeleccionado.nombre}</h3>
          <table className="tabla-animal">
            <thead>
              <tr>
                <th>Código</th>
                <th>Tipo</th>
                <th>Raza</th>
                <th>Sexo</th>
                <th>Peso</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {animalesLote.map(animal => (
                <tr key={animal.id_animal}>
                  <td>{animal.codigo}</td>
                  <td>{animal.tipo}</td>
                  <td>{animal.raza}</td>
                  <td>{animal.sexo}</td>
                  <td>{animal.peso} kg</td>
                  <td>{animal.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Lote;