const express = require('express')
const bodyParser = require('body-parser')
const teamsApi = require('./src/routes/teams-api')
const seurityApi = require('./src/routes/security-api')
const adminApi = require('./src/routes/admin-api')
const matchesApi = require('./src/routes/matches-api')
const mongooseConfig = require('./src/config/mongoose-connection')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(teamsApi)
app.use(seurityApi)
app.use(adminApi)
app.use(matchesApi)

app.use((err, req, res, next) => {
    let STATUS = 500

    if (err.message.match(/not found/)) {
        STATUS = 400
    }

    return res.status(STATUS).send({ error: err.message })
})
  

app.listen(3000, () => {
    console.log('running on port: 3000')
})