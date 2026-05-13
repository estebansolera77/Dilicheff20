import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    id_rol: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegistro = async () => {
    try {
      await axios.post('http://localhost:3000/api/registro', form);
      alert('Registro exitoso!');
      setForm({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        id_rol: ''
      });
    } catch (error) {
      alert('Error al registrar');
    }
  };

  return (
    <div className='registrar'>
      <h2>Registro Ganaderia Úraba</h2>
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
      <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="password" placeholder="Password" value={form.password} onChange={handleChange} />

      <select name="id_rol" onChange={handleChange}>
      <option value="1">Veterinario</option>
      <option value="2">Empleado</option>
      <option value="3">Admin</option>
      </select>
      <button onClick={handleRegistro}>Registrar</button>
    </div>
  );
}

export default App;