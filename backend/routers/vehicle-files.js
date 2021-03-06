'use strict'

const debug = require('debug')('rpc')

module.exports = function(knex) {

    debug('#load driver-files router')
    const model = require('../models/vehicle-files')(knex)
    const app = require('./rpc')(model)
    return app
}

