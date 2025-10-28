const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  provider: {
    type: String,
    required: true,
    enum: ['google', 'facebook', 'github']
  },
  providerId: {
    type: String,
    required: true
  },
  email: String,
  name: String,
  avatar: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure unique provider+providerId combinations
userSchema.index({ provider: 1, providerId: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);