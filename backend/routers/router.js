'use strict'

const lodash = require('lodash')

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
}

module.exports = function(model) {

    const express = require('express')
    const router = express.Router()

    function responder(req, res) {

        console.log({ body: req.body })

        if(!lodash.has(req, 'body.method')) {
            res.send(error.invalidRequest)
            return
        }

        if(!lodash.has(req, 'body.id')) {
            res.send(error.invalidRequest)
            return
        }

        if(!lodash.has(req, 'body.params')) {
            res.send(error.invalidRequest)
            return
        }

        if (!lodash.isString(req.body.method)) {
            res.send(error.invalidRequest)
            return
        }

        if (!lodash.isString(req.body.id) && !lodash.isNumber(req.body.id)) {
            res.send(error.invalidRequest)
            return
        }

        if (typeof(req.body.params) === 'undefined') {
            res.send(error.invalidRequest)
            return
        }

        if (typeof(model[req.body.method]) !== 'function') {
            res.send(error.methodNotFound)
            return
        }

        const method = req.body.method
        var params = req.body.params
        const id = req.body.id

        if (method === 'check') {
            if (lodash.has(req, 'session.userId')) {
                params = { id: req.session.userId }
            } else {
                params = { id: -1 }
            }
        }

        var modelPromise = model[method](params)

        modelPromise
            .then(function(result) {

                if (method === 'login' && lodash.has(result, '[0].id')) {
                        req.session.userId = result[0].id
                        req.session.userProfile = result[0]
                }

                console.log({ method: method, result: result })

                res.send({
                    jsonrpc: "2.0",
                    result: result,
                    id: id
                })
            })
            .catch(function(err) {
                console.log(err)
                res.send({
                    jsonrpc: "2.0",
                    error: {
                        code: -32603,
                        message: "Internal error"
                    },
                    id: id
                })
            })
    }

    router.post('/', responder)
    return router
}
