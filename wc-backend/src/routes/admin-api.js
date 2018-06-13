const express = require('express')
const api = express.Router()
const Match = require('../models/match')
const auth =require('express-jwt')
const guard = require('express-jwt-permissions')()

const updateScore = async (matchId, teamId) => {
  try {
    let match = await Match.findById(matchId)
    
    if (match == null) throw new Error("Match not found")

    if (teamId == 'team_1') {
      match.score.team_1++;
    } else {
      match.score.team_2++;
    }

    match = await match.save()
    return match

  } catch (err) {
    throw err
  }
}


api
  .route('/admin/match/:id?')
  .post(auth({ secret: 's3cret'}),
    guard.check('admin'),
  (req, res, next) => {     
    const match = new Match(req.body)
    match.score = {
      team_1: 0,
      team_2: 0
    }
    match.subscribers = []
    match.save()
      .then(data => res.json(data))
      .catch(err => { next(err) } )
     
  })
   .put((req, res, next) => {
     
    const matchId = req.params.id
    const teamId = req.body.teamId

    updateScore(matchId, teamId)
      .then(match => res.json(match))
      .catch(err => { next(err) })

  })
  .delete((req, res, next) => {
    const matchId = req.params.id
    Match.deleteOne({_id: matchId})
      .then(data => res.json(data))
      .catch(err => { next(err) } )
  })


module.exports = api