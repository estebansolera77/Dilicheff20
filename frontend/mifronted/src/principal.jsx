import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Animal from './Animal';
import Lote from './Lote';

function Principal() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const [seccion, setSeccion] = useState('inicio');

  return (
    <div className="principal">
      <div className="sidebar">
        <h2>Ganadería Úraba</h2>
        <ul>
          <li onClick={() => setSeccion('animal')}>🐄 Animal</li>
          <li onClick={() => setSeccion('lote')}>📦 Lote</li>

          {usuario.id_rol === 1 && (
            <>
              <li onClick={() => setSeccion('vacunas')}>💉 Vacunas</li>
              <li onClick={() => setSeccion('medicamentos')}>💊 Medicamentos</li>
              <li onClick={() => setSeccion('reproduccion')}>🐮 Reproducción</li>
            </>
          )}

          {usuario.id_rol === 2 && (
            <li onClick={() => setSeccion('rotacion')}>🔄 Rotación Lote</li>
          )}

          {usuario.id_rol === 3 && (
            <>
              <li onClick={() => setSeccion('usuarios')}>👤 Usuarios</li>
              <li onClick={() => setSeccion('reportes')}>📊 Reportes</li>
              <li onClick={() => setSeccion('veterinarios')}>🩺 Veterinarios</li>
            </>
          )}
        </ul>

        <li onClick={() => { localStorage.clear(); navigate('/'); }}
          style={{ marginTop: 'auto', color: 'red', listStyle: 'none', cursor: 'pointer', padding: '12px 15px' }}>
          🚪 Cerrar Sesión
        </li>
      </div>

      <div className="contenido">
        {seccion === 'inicio' && <h2>Bienvenido, {usuario.nombre} {usuario.apellido}</h2>}
        {seccion === 'animal' && <Animal />}
        {seccion === 'lote' && <Lote />}
      </div>
    </div>
  );
}

export default Principal;