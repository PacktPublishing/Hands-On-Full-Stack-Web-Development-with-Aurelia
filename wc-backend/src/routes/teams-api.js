const express = require('express')
const api = express.Router()
const Team = require('../models/team')

const updateTeam = async (id, teamBody) => {
  try {
    let team = await Team.findById(id)
    
    if (team == null) throw new Error("Team not found")

    team.code = teamBody.code || team.code
    team.name = teamBody.name || team.name
    team.ranking = teamBody.ranking || team.ranking
    team.captain = teamBody.captain || team.captain
    team.trainer = teamBody.trainer || team.trainer
    team.confederation = teamBody.confederation || team.confederation

    team = await team.save()
    return team

  } catch (err) {
    throw err
  }
}

const deleteTeam = async (id) => {
  try {
    let team = await Team.findById(id)
    
    team = await team.delete()
    return team
  } catch (err) {
    throw err
  }
}

api
  .route('/teams')
  .get((req, res, next) => {
    Team.find()
      .then(data => res.json(data))
      .catch(err => { next(err) })
  })  
  .post((req, res, next) => {
    let team = new Team(req.body)
    team.save()
      .then(data => res.json(data))
      .catch(err => { next(err) } )
  })

api
  .route('/teams/:id')
  .get((req, res, next) => {
      let id = req.params.id
      Team.findById(id)
        .then(data => {
          if (data == null) {
            throw new Error("Team not found")
          }

          res.json(data)
        })
        .catch(err => {
          next(err) })
  })
  .put((req, res, next) => {
    let id = req.params.id

    updateTeam(id, req.body)
      .then(team => res.status(200).json(team))
      .catch(err => next(err))

  })
  .delete((req, res, next) => {
    let id = req.params.id

    Team.remove({_id: id})
    .then(result => res.status(200).json(result))
    .catch(err => next(err))
  })


module.exports = api