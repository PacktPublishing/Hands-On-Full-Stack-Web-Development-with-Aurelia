const express = require('express')
const api = express.Router()
const Match = require('../models/match')
const auth =require('express-jwt')

const subscribe = async(matchId, user) => {
  let match = await Match.findById(matchId)

  if (!match) {
    throw new Error('Match not found')
  }
  match.subscribers.push(user)
  match = await match.save()
  return match
}

api
  .route('/matches')
  .get(auth({ secret: 's3cret'}),
    (req, res, next) => {
      let criteria = {}
      if (req.user.permissions.indexOf('admin') == -1) {
        console.log(req.user.user)
        criteria = { subscribers: req.user.user }
      }

     Match.find(criteria).exec()
        .then(matches => res.json(matches))
        .catch(err => next(err))       
  })
 api
  .route('/matches/subscribe/:id')
  .post(auth({ secret: 's3cret'}),
    async (req, res, next) => {
    subscribe(req.params.id, req.body.user)
      .then(match => res.json(match))
      .catch(err => next(err)) 
  })

module.exports = api