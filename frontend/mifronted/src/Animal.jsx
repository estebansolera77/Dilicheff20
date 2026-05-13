import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Animal() {
  const [animales, setAnimales] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState({
    codigo: '', tipo: '', raza: '', sexo: '', fecha_nacimiento: '', peso: '', id_lote: ''
  });

  useEffect(() => {
    cargarAnimales();
  }, []);

  const total = animales.length;
  const activos = animales.filter(a => a.estado === 'ACTIVO').length;
  const vendidos = animales.filter(a => a.estado === 'VENDIDO').length;
  const muertos = animales.filter(a => a.estado === 'MUERTO').length;

  const [buscar, setBuscar] = useState('');

  const [notificacion, setNotificacion] = useState('');

  const datosGrafica = [
  { estado: 'Activos', cantidad: activos },
  { estado: 'Vendidos', cantidad: vendidos },
  { estado: 'Muertos', cantidad: muertos },
  ];

  const animalesFiltrados = animales.filter(a =>
  a.codigo.toLowerCase().includes(buscar.toLowerCase()) ||
  a.raza.toLowerCase().includes(buscar.toLowerCase()) ||
  a.tipo.toLowerCase().includes(buscar.toLowerCase())
  );

  const cargarAnimales = async () => {
    const res = await axios.get('http://localhost:3000/api/animal');
    setAnimales(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCrear = async () => {
    await axios.post('http://localhost:3000/api/animal', form);
    alert('Animal registrado!');
    setMostrarForm(false);
    setForm({ codigo: '', tipo: '', raza: '', sexo: '', fecha_nacimiento: '', peso: '', id_lote: '' });
    cargarAnimales();
  };

  const handleEstado = async (id, estado) => {
    await axios.put(`http://localhost:3000/api/animal/deshabilitar/${id}`, { estado });
    cargarAnimales();
  };

  const [animalesLote, setAnimalesLote] = useState([]);
  const [loteSeleccionado, setLoteSeleccionado] = useState(null);

  const verAnimales = async (lote) => {
  const res = await axios.get(`http://localhost:3000/api/animal/lote/${lote.id_lote}`);
  setAnimalesLote(res.data);
  setLoteSeleccionado(lote);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Animales</h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
         className="buscador"
         placeholder="Buscar por código, tipo o raza..."
         value={buscar}
         onChange={(e) => setBuscar(e.target.value)}
         />
          <button className="btn-crear" onClick={() => setMostrarForm(true)}>+ Nuevo Animal</button>
       </div>
         </div>

      {mostrarForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Nuevo Animal</h3>
              <button className="modal-cerrar" onClick={() => setMostrarForm(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="campo">
                <label>Código</label>
                <input name="codigo" placeholder="Ej: A001" value={form.codigo} onChange={handleChange} />
              </div>
              <div className="campo">
                <label>Tipo</label>
                <select name="tipo" value={form.tipo} onChange={handleChange}>
                  <option value="">Seleccionar</option>
                  <option value="VACA">Vaca</option>
                  <option value="TORO">Toro</option>
                  <option value="CABALLO">Caballo</option>
                </select>
              </div>
              <div className="campo">
                <label>Raza</label>
                <input name="raza" placeholder="Ej: Holstein" value={form.raza} onChange={handleChange} />
              </div>
              <div className="campo">
                <label>Sexo</label>
                <select name="sexo" value={form.sexo} onChange={handleChange}>
                  <option value="">Seleccionar</option>
                  <option value="MACHO">Macho</option>
                  <option value="HEMBRA">Hembra</option>
                </select>
              </div>
              <div className="campo">
                <label>Fecha Nacimiento</label>
                <input name="fecha_nacimiento" type="date" value={form.fecha_nacimiento} onChange={handleChange} />
              </div>
              <div className="campo">
                <label>Peso (kg)</label>
                <input name="peso" placeholder="Ej: 450" type="number" value={form.peso} onChange={handleChange} />
              </div>
              <div className="campo ancho-completo">
                <label>Lote</label>
                <input name="id_lote" placeholder="ID Lote" type="number" value={form.id_lote} onChange={handleChange} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancelar" onClick={() => setMostrarForm(false)}>Cancelar</button>
              <button className="btn-guardar" onClick={handleCrear}>Guardar</button>
            </div>
          </div>
        </div>
      )}

      <div className="tarjetas">
  <div className="tarjeta">
    <span className="tarjeta-label">Total</span>
    <span className="tarjeta-numero">{total}</span>
  </div>
  <div className="tarjeta">
    <span className="tarjeta-label">Activos</span>
    <span className="tarjeta-numero activo">{activos}</span>
  </div>
  <div className="tarjeta">
    <span className="tarjeta-label">Vendidos</span>
    <span className="tarjeta-numero vendido">{vendidos}</span>
  </div>
  <div className="tarjeta">
    <span className="tarjeta-label">Muertos</span>
    <span className="tarjeta-numero muerto">{muertos}</span>
  </div>
</div>
        <div className="grafica">
  <ResponsiveContainer width="100%" height={200}>
    <BarChart data={datosGrafica}>
      <XAxis dataKey="estado" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="cantidad" fill="#5C8A4A" radius={[6, 6, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
</div>
      <table className="tabla-animal">
        <thead>
          <tr>
            <th>Código</th>
            <th>Tipo</th>
            <th>Raza</th>
            <th>Sexo</th>
            <th>Fecha Nac.</th>
            <th>Peso</th>
            <th>Estado</th>
            <th>Cambiar Estado</th>
          </tr>
        </thead>
        <tbody>
          {animalesFiltrados.map(animal => (
            <tr key={animal.id_animal}>
              <td>{animal.codigo}</td>
              <td>{animal.tipo}</td>
              <td>{animal.raza}</td>
              <td>{animal.sexo}</td>
              <td>{new Date(animal.fecha_nacimiento).toLocaleDateString()}</td>
              <td>{animal.peso} kg</td>
              <td>{animal.estado}</td>
              <td>
                <select onChange={(e) => handleEstado(animal.id_animal, e.target.value)} defaultValue={animal.estado}>
                  <option value="ACTIVO">Activo</option>
                  <option value="VENDIDO">Vendido</option>
                  <option value="MUERTO">Muerto</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Animal;