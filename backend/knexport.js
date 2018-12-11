#!/usr/bin/env node

'use strict'

const exconfig = require('./exconfig')
const knexfile = require(exconfig.appDir + '/knexfile')
const knex = require('knex')(knexfile.development)
const fs = require('fs')

//var tableName = 'domains'
var header = function(tableName) {
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

//var tables = ['users','domains', 'roles']
var tables = ['users']


tables.forEach(function(item) {
    console.log('export table ' + item)
    knex
        .select()
        .from(item)
        .then(function(result) {
            var out = fs.createWriteStream('./seeds/_' + item + '.js', {flags : 'w'})
            out.write(header(item) + '\n')
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
