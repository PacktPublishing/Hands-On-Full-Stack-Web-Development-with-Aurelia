const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const api = express.Router()

const logIn = async (username, password)  => {

    const user = await User.findOne({ username })

    if (!user) {
        throw new Error("Authentication failed")
    }

    const match = await comparePassword(user, password)
    if (!match) {
        throw new Error("Authentication failed")
    }
    return generateToken({ user: user.username, permissions: user.permissions})
}

const comparePassword = async (user, password) => {
    return new Promise(resolve => {
      user.comparePassword(password, async (err, match) => {
        resolve(!err && match)
      })
    })
}

const generateToken = (userData) => {
   return jwt.sign(userData, "s3cret", { expiresIn: '3h' })
}

api
  .route('/auth')
  .post((req, res, next) => {
    let { username, password } = req.body
    logIn(username, password)
    .then(token => {
        if (token) {
            res.send(token)
        }
    })
    .catch(err => {
        next(err)
    }) 
  })

api
  .route('/auth/register')
  .post((req, res, next) => {
    let { username, password, permissions } = req.body
    let user = new User({ username, password, permissions})
    user.save((err, user) => {
        if (err) {
            return res.status(500).send("User creation failed")
        }
        res.status(200).send("User created")
    })
  })


module.exports = api
