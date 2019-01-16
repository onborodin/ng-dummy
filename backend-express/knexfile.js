'use strict'

var path = require('path')

module.exports = {
    client: 'pg',
    connection: 'postgres://pgsql@localhost/lorem',
    useNullAsDefault: true,
    migrations: {
        directory: __dirname + '/migrations'
    },
    seeds: {
        directory: __dirname + '/seeds'
    },
}