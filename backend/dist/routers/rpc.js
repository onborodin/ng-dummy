'use strict';
const debug = require('debug')('rpc');
const fs = require('fs');
const path = require('path');
const lodash = require('lodash');
const Koa = require('koa');
const Router = require('koa-router');
const error = {
    invalidRequest: {
        jsonrpc: "2.0",
        error: {
            code: -32600,
            message: "Invalid Request"
        },
        id: null
    },
    parseError: {
        jsonrpc: "2.0",
        error: {
            code: -32700,
            message: "Parse error"
        },
        id: null
    },
    methodNotFound: {
        jsonrpc: "2.0",
        error: {
            code: -32601,
            message: "Method not found"
        },
        id: 1
    },
    internalError: {
        jsonrpc: "2.0",
        error: {
            code: -32603,
            message: "Internal error"
        },
        id: 0
    }
};
module.exports = function (model) {
    debug(`#load rpc module with model ${model.modelName}`);
    const app = new Koa();
    const router = new Router();
    async function responder(ctx, next) {
        const req = ctx.request;
        const res = ctx.responce;
        debug('##rpc request', { body: req.body });
        if (!lodash.has(req, 'body.method')) {
            ctx.body = error.invalidRequest;
            return;
        }
        if (!lodash.has(req, 'body.id')) {
            ctx.body = error.invalidRequest;
            return;
        }
        if (!lodash.has(req, 'body.params')) {
            ctx.body = error.invalidRequest;
            return;
        }
        if (!lodash.isString(req.body.method)) {
            ctx.body = error.invalidRequest;
            return;
        }
        if (!lodash.isString(req.body.id) && !lodash.isNumber(req.body.id)) {
            ctx.body = error.invalidRequest;
            return;
        }
        if (typeof (req.body.params) === 'undefined') {
            ctx.body = error.invalidRequest;
            return;
        }
        if (typeof (model[req.body.method]) !== 'function') {
            ctx.body = error.methodNotFound;
            return;
        }
        const method = req.body.method;
        const params = req.body.params;
        const id = req.body.id;
        debug('#rpc method = ', method);
        debug('#rpc params = ', params);
        debug('#rpc id = ', id);
        try {
            const result = await model[method](params);
            debug('#rpc responce ', { method: method, result: result });
            //if (method === 'login' && lodash.has(result, 'id')) {
            //        ctx.session.user = result
            //        ctx.session.user.password = ''
            //}
            if (method === 'login' && lodash.has(result, 'id')) {
                ctx.state.session = result;
                debug('#set session data ', ctx.state.session);
            }
            ctx.body = {
                jsonrpc: "2.0",
                result: result,
                id: id
            };
        }
        catch (err) {
            debug('#rpc error ', { method: method, result: result }, error);
            console.log(err);
            ctx.body = {
                jsonrpc: "2.0",
                error: {
                    code: -32603,
                    message: "Internal error"
                },
                id: id
            };
        }
    }
    async function hello(ctx, hext) {
        ctx.body = {
            jsonrpc: '2.0',
            result: 'hello',
            id: 1
        };
    }
    router.all('/', responder);
    router.all('/hello', responder);
    app.use(router.routes());
    app.use(router.allowedMethods());
    return app;
};
