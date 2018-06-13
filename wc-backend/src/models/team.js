const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema({
    name: {
      type: String,
      min: 3,
      max: 100,
      required: true,
      unique: true
    },
    ranking: {
      type: Number,
      min: 1
    },
    captain: {
      type: String,
      required: true
    },
    Trainer: {
      type: String,
      required: true
    },
    confederation: {
      type: String,
      required: true,
      uppercase: true
    }
  })
  
module.exports = mongoose.model('team', TeamSchema)