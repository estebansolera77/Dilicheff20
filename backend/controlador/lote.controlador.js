const express = require('express');
const router = express.Router();
const service = require('../servicios/lote.servicio');

router.get('/', async (req, res) => {
  try {
    const lotes = await service.obtenerLotes();
    res.send(lotes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener lotes');
  }
});

router.post('/', async (req, res) => {
  try {
    await service.registrarLote(req.body);
    res.status(201).send('Lote registrado exitosamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al registrar lote');
  }
});

router.put('/:id', async (req, res) => {
  try {
    await service.actualizarLote({ ...req.body, id_lote: req.params.id });
    res.send('Lote actualizado exitosamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar lote');
  }
});

module.exports = router;