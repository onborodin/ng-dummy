'use strict'

module.exports = function(knex) {
    const model = require('models/users')(knex)
    const router = require('routers/router')(model)
    return router
}
