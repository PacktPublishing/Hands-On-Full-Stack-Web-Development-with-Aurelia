const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/wcDb', { useMongoClient: true })
mongoose.Promise = global.Promise


mongoose.connection.on('connected', function() {
  console.log('connection is ready')
})

mongoose.connection.on('error', function(err) {
  console.log(err)
})