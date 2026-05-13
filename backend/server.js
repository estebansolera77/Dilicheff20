const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

const registrarRoutes = require('./controlador/login.controlador');
app.use('/api', registrarRoutes);

const animalRoutes = require('./controlador/animal.controlador');
app.use('/api/animal', animalRoutes);

const loteRoutes = require('./controlador/lote.controlador');
app.use('/api/lote', loteRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});