'use strict'

const fs = require('fs')
const path = require('path')

const Koa = require('koa')
const Router = require('koa-router')

module.exports = function(config) {

    const app = new Koa()
    const router = new Router()

    async function login(ctx, next) {
        ctx.state.session = { user: { id: 5 }}
        ctx.body = { result: true }
    }

    async function logout(ctx, next) {
        ctx.state.session = null
        ctx.body = { result: true }
    }

    router.all('/login', login)
    router.all('/logout', logout)

    app.use(router.routes())
    app.use(router.allowedMethods())

    return app
}
