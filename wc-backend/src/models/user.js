const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 6,
    max: 20
  },
  password: {
    type: String,
    required: true
  },
  permissions: [{
    type: String
  }]
}, { timestamps: true })

UserSchema.pre('save', function (next) {
  const me = this
  if (me.isModified('password') || me.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err)
      }
      bcrypt.hash(me.password, salt, (err, hash) => {
        if (err) {
          return next(err)
        }
        me.password = hash
        next()
      })
    })
  } else {
    return next()
  }
})

UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, match) => {
    if (err) {
      return callback(err)
    }
    callback(null, match)
  })
}



module.exports = mongoose.model('user', UserSchema)