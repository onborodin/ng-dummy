'use strict'

const knexfile = require('./knexfile')
const knex = require('knex')(
    knexfile.development
)


var express = require('express')
var router = express.Router()

const model = require('./models/users')(knex)

router.post('/list', function(req, res) {
    model
        .list({}, function(err, data) {
            res.send({ result: data })
        })
})

module.exports = router
