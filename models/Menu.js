const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: String, default: 'Pizzas' },
  image: String // Puedes dejarlo en blanco por ahora
});

module.exports = mongoose.model('Menu', menuSchema);
