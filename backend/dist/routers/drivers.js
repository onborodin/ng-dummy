'use strict';
const debug = require('debug')('rpc');
module.exports = function (knex) {
    debug('#load drivers router');
    const model = require('../models/drivers')(knex);
    const app = require('./rpc')(model);
    return app;
};
