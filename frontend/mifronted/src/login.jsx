import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/login', form);
      const usuario = res.data;

      localStorage.setItem('usuario', JSON.stringify(usuario)); // guarda el usuario
      alert(`Bienvenido ${usuario.nombre}`);
      navigate('/principal');

    } catch (error) {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="registrar">
      <h2>Login</h2>
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} />
      <button onClick={handleLogin}>Iniciar Sesión</button>
      <button onClick={() => navigate('/registrar')}>Registrarse</button>
    </div>
  );
}

export default Login;