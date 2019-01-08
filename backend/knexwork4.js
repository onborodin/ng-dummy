
'use strict'

var path = require('path')
var fs = require('fs')
var util = require('util')

var knexfile = require('./knexfile')
var knex = require('knex')(
    knexfile.development
)

knex
    .insert({
        gecos: 'Gecos',
        name: 'Super Mario',// + Math.random(),
        password: '12345',
        superuser: true,
    })
    .into('users')
    //.return('id')
    .then(function(res) {
        if (res.rowCount) return res.rowCount
        return 0
    })
    .then(function(res) {
        console.log(res)
    })
    .finally(function() {
        knex.destroy();
    })


