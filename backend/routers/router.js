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

        //console.log({ body: req.body })

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
        const params = req.body.params
        const id = req.body.id

        model[method](params)
            .then(function(result) {

                if (method === 'login' && lodash.has(result, 'id')) {
                        req.session.user = result
                        req.session.user.password = 'xxxxxxxxxxx'
                }
                //console.log({ method: method, result: result })

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
