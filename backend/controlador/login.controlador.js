const express = require('express');
const router = express.Router();
const service = require('../servicios/login.servicio');

// Registrar
router.post('/registro', async (req, res) => {
  try {
    await service.registrarUser(req.body);
    res.status(201).send('Registro Exitoso!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al registrar');
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    console.log(req.body); // agrega esto
    const usuario = await service.iniciarSesion(req.body);
    console.log(usuario); // y esto
    
    if (!usuario) {
      return res.status(401).send('Credenciales incorrectas');
    }
    
    res.send(usuario);
  } catch (error) {
    res.status(500).send('Error al iniciar sesión');
  }
});

module.exports = router;