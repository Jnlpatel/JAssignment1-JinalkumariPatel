// models/menu.js
const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: String,
  path: String,
  weight: Number,
}, { collection: 'menuLinks' }); // Explicitly set the collection name

module.exports = mongoose.model('Menu', menuSchema);