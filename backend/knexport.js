#!/usr/bin/env node

'use strict'


Object.defineProperty(Date.prototype, 'timestamp', {
    value: function() {
        function pad2(n) {
            return (n < 10 ? '0' : '') + n;
        }

        return this.getFullYear() +
               pad2(this.getMonth() + 1) + 
               pad2(this.getDate()) +
               pad2(this.getHours()) +
               pad2(this.getMinutes()) +
               pad2(this.getSeconds());
    }
});

const timestamp = new Date().timestamp()

const exconfig = require('./exconfig')
const knexfile = require(exconfig.appDir + '/knexfile')
const knex = require('knex')(knexfile.development)
const fs = require('fs')

//var tableName = 'domains'
var header = function(tableName) {
  return ` 
exports.seed = function(knex, Promise) {
    var rows = []
`
}

var footer = function(tableName) {
    return `

    console.log(rows.length)
    var chunkSize = 50
    return knex('${tableName}').del()
        .then(function() {
            return knex.batchInsert('${tableName}', rows, chunkSize)
        })
}
`
}

var tables = [ 'users', 'customers' ]

tables.forEach(function(item) {
    console.log('export table ' + item)
    knex
        .select()
        .from(item)
        .then(function(result) {
            var out = fs.createWriteStream('./seeds/' + timestamp + '_' + item + '.js', {flags : 'w'})
            out.write(header(item) + '\n')
            result.forEach(function(item) {
                out.write('    rows.push(' + JSON.stringify(item) + ')\n')
            })
            out.write(footer(item) + '\n')
            out.close()

        })
        .finally(function() {
            knex.destroy();
        })
})
