'use strict'

const fs = require('fs')
const path = require('path')

const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

const asyncBusboy = require('async-busboy')
const tools = require('../tools')
const config = require('../config')

async function upload(ctx) {
    var files = []
    await asyncBusboy(ctx.req, {
        onFile: function(fieldname, file, fileName, encoding, mimeType) {

            const blobName = tools.timestamp() + '-' + tools.hash(fileName) + '.bin'
            const blobPath = path.join(config.dataDir, blobName)

            file.pipe(fs.createWriteStream(blobPath))

            file.on('end', function() {
                files.push({ 
                    fileName: fileName,
                    blobName: blobName,
                    mimeType: mimeType
                })
            })
        }
    })
    ctx.body = { result: files }
}

router.all('/', upload)

app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
