const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  color: {
    type: String,
    default: '#3B82F6'
  }
}, {
  timestamps: true  
});

module.exports = mongoose.model('Board', boardSchema);