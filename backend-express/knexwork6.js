'use strict'

var path = require('path')
var fs = require('fs')
var util = require('util')

var knexfile = require('./knexfile')
var knex = require('knex')(knexfile)


knex
    .schema.createTable('data', function(table) {
        table.increments('id').primary().unique()
        table.string('name')
        table.string('file')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    .then(function(res) {
        console.log(res)
    })
    .finally(function() {
        knex.destroy();
    })

//Result {
//  command: 'CREATE',
//  rowCount: null,
//  oid: null,
//  rows: [],
//  fields: [],
//  _parsers: [],
//  RowCtor: null,
//  rowAsArray: false,
//  _getTypeParser: [Function: bound ] }