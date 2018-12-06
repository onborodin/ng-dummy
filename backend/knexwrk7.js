'use strict'

const path = require('path')
const fs = require('fs')
const util = require('util')

const knexfile = require('./knexfile')
const knex = require('knex')(
    knexfile.development
)

//const users = require('./models/users')(knex)

//users
//    .list({})
//    .then((res) => {
//        console.log({ res: res })
//    })
//    .finally(function() {
//        knex.destroy();
//    })

knex
    .select(knex.raw('select *'))
    .from('superusers')
    .then((res) => {
        console.log({ res: res })
    })
    .finally(function() {
        knex.destroy();
    })




