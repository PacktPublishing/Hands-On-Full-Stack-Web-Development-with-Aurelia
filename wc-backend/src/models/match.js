const mongoose = require('mongoose')

const MatchSchema = new mongoose.Schema({
    team_1: {
      type: String,
      min: 3,
      max: 100,
      required: true
    },
   team_2: {
      type: String,
      min: 3,
      max: 100,
      required: true
    },
    score: {
      team_1: Number,
      team_2: Number
    },
    subscribers: [
      {type: String}
    ]
}, { usePushEach: true })
  
module.exports = mongoose.model('match', MatchSchema)