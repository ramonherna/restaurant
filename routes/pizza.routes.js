const express = require('express');
const router = express.Router();
const Pizza = require('../models/Pizza');

// Mostrar todas las pizzas (página principal o para pruebas)
router.get('/', async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (err) {
    res.status(500).send('Error al obtener las pizzas');
  }
});

module.exports = router;
