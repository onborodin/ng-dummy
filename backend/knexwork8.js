'use strict'

var path = require('path')
var fs = require('fs')
var util = require('util')

var knexfile = require('./knexfile')
var knex = require('knex')(knexfile)

var Promise = require("bluebird")

const drivers = require('./models/drivers')(knex)

async function driversList() {
    var list = await drivers.list()
    console.log(list)

    console.log(12345)

}

driversList()
