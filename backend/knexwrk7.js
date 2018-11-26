'use strict'

const path = require('path')
const fs = require('fs')
const util = require('util')

const knexfile = require('./knexfile')
const knex = require('knex')(
    knexfile.development
)

const users = require('./models/users')(knex)


var callback = function(err, res) {
    console.log(res)
}

users
    .drop({ id: 9 }, callback)
    .finally(function() {
        knex.destroy();
    })



