// Create a schema for use with mongoose
const mongoose = require('mongoose');

const VarietySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  fullText: {
    type: String,
    required: true,
    trim: true
  },
  paragraphs: {
    type: Array,
    required: true
  }
});

const Variety = mongoose.model('Variety', VarietySchema);
module.exports = Variety;