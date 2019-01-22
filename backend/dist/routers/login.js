'use strict';
const debug = require('debug')('rpc');
module.exports = function (knex) {
    debug('#load login router');
    const model = require('../models/login')(knex);
    const app = require('./rpc')(model);
    return app;
};
