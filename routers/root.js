'use strict'

const fs = require('fs')
const path = require('path')

const Koa = require('koa')
const Router = require('koa-router')

const config = require('../config')

const app = new Koa()
const router = new Router()

async function hello(ctx) {
    ctx.body = { result: "hello" }
}

async function index(ctx) {
    ctx.type = 'text/html'
    const path = path.join(config.piblicDir, 'index.html')
    ctx.response.body = fs.createReadStream(path)
}

router.all('/api', hello)
router.all('/hello', hello)
router.all('/*', index)

app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
