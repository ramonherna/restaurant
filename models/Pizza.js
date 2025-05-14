const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Price: { type: String, required: true },
  Type: { type: String },
  Category: { type: String },
  Description: { type: String },
  Image: { type: String }, // Campo agregado
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pizza', pizzaSchema);

