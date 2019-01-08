
'use strict'

var path = require('path')
var fs = require('fs')
var util = require('util')

var knexfile = require('./knexfile')
var knex = require('knex')(
    knexfile.development
)

knex
    .select()
    .table('domains')
    .then(function(res) {
        console.log(res)
    })

knex
    .from('users')
    .select(['users.*', 'domains.name as domain_name'])
    //.select(['users.*', knex.raw('to_json(domains.*) as domain')])
    .innerJoin('domains as domains', 'domains.id', 'users.domain_id')
    .orderBy('users.name')
    .then(function(res) {
        console.log(res)
    })


knex
    .from('users')
    .where({id: 11})
    .del()
    .then(function(res) {
        console.log(res)
    })


