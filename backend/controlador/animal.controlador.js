const express = require('express');
const router = express.Router();
const service = require('../servicios/animal.servicio');

router.get('/', async (req, res) => {
   try{
    const animales = await service.obtenerAnimales();
    res.send(animales);

   }catch (error){
    console.error(error);
    res.status(500).send('Error al obtener los animales');
   }
   
});

router.get('/lote/:id', async (req, res) => {
  try {
    const animales = await service.obtenerAnimalesPorLote(req.params.id);
    res.send(animales);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener animales del lote');
  }
});

router.post('/', async (req, res) => {
  try {
    await service.registrarAnimal(req.body);
    res.status(201).send('Animal registrado exitosamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al registrar animal');
  }
});

router.put('/:id', async (req, res) => {
  try {
    await service.actualizarAnimal({ ...req.body, id_animal: req.params.id });
    res.send('Animal actualizado exitosamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar animal');
  }
});

router.put('/deshabilitar/:id', async (req, res) => {
  try {
    await service.deshabilitarAnimal(req.params.id, req.body.estado);
    res.send('Animal deshabilitado exitosamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al deshabilitar animal');
  }
});

module.exports = router;