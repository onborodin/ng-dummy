'use strict';
const debug = require('debug')('rpc');
module.exports = function (knex) {
    debug('#load vehicles router');
    const model = require('../models/vehicles')(knex);
    const app = require('./rpc')(model);
    return app;
};
