#!/usr/bin/env node

'use strict'

//const exconfig = require('./exconfig')
//const knexfile = require('./knexfile')
//const knex = require('knex')(knexfile)

const knexfile = require('./knexfile')
const knexStringcase = require('knex-stringcase')(knexfile)
const knex = require('knex')(knexStringcase)

const fs = require('fs')

//var tableName = 'domains'
var head = function(tableName) {
  return `exports.seed = function(knex, Promise) {
    return knex('${tableName}').del()
        .then(function() {
            return knex('${tableName}').insert([`
}

var footer = function() {
    return `
            ])
        })
}`
}

var tables = [ 'users', 'drivers', 'vehicles', 'connections', 'data' ]

tables.forEach(function(item) {
    knex
        .select()
        .from(item)
        .then(function(result) {
            var out = fs.createWriteStream('./seeds/_' + item + '.js', {flags : 'w'})
            out.write(head(item) + '\n')
            result.forEach(function(item) {
                out.write('                ' + JSON.stringify(item) + ',\n')
            })
            out.write(footer(item) + '\n')
            out.close()

        })
        .finally(function() {
            knex.destroy();
        })
})
