'use strict'

const path = require('path')
const fs = require('fs')
const util = require('util')

const knexfile = require('./knexfile')
const knex = require('knex')(
    knexfile.development
)

const usersModel = require('./models/users')(knex)


var callback = function(err, res) {
    console.log(res)
}

usersModel
    .usersFindId({ id: 9 }, callback)
    .finally(function() {
        knex.destroy();
    })



