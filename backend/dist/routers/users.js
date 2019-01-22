'use strict';
const debug = require('debug')('rpc');
module.exports = function (knex) {
    debug('#load users router');
    const model = require('../models/users')(knex);
    const app = require('./rpc')(model);
    return app;
};
