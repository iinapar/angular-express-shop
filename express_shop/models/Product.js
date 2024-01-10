const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, max: 40 },
  shortDescription: { type: String, required: true, max: 50 },
  description: { type: String, required: true, max: 200 },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  available: { type: Number, min: 0 },
  img: { type: String },
});

module.exports = mongoose.model('Product', productSchema);
