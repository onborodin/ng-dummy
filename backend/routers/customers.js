'use strict'

module.exports = function(knex) {
    const model = require('models/customers')(knex)
    const router = require('routers/exrouter')(model)
    return router
}
