'use strict'

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

const express = require('express')
const router = express.Router()

module.exports = function(model) {

    const responder = function(req, res) {

        if (typeof req.body.method !== 'string') {
            res.send(error.invalidRequest)
            return
        }

        if (typeof(req.body.id) !== 'string' && typeof(req.body.id) !== 'number') {
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
        const params = req.body.params
        const id = req.body.id

        model[method](params)
            .then(function(data) {
                res.send({
                    jsonrpc: "2.0",
                    result: data,
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
