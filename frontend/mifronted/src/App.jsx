import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './login';
import Registro from './registrar';
import Principal from './principal';
import Animal from './Animal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registrar" element={<Registro />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/animal" element={<Animal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;