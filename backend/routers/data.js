'use strict'

const debug = require('debug')('data')
const util = require('util')
const crypto = require('crypto')
const mime = require('mime')

const readChunk = require('read-chunk')
const fileType = require('file-type')
const moment = require('moment')
const fs = require('fs')
const path = require('path')

const lodash = require('lodash')
const asyncBusboy = require('async-busboy')


const Koa = require('koa')
const Router = require('koa-router')

const tools = require('../tools')

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

function hash(string) {
    return crypto.createHmac('md5', string + Math.random()).digest('hex')
}

function timestamp() {
    return moment().format('YYYYMMDDhhmmss')
}

function dataType(aPath) {
    const buffer = readChunk.sync(aPath, 0, fileType.minimumBytes)
    const type = fileType(buffer)
    if (type !== null) {
        type.ext = '.' + type.ext
        return type
    }
    return {
        ext: '.bin',
        mime: 'application/octet-stream'
    }
}

function isDigit(value) {
    return /^\d+$/.test(value)
}

module.exports = function(knex, config) {

    const model = require('models/data')(knex)

    const app = new Koa()
    const router = new Router()

    async function upload(ctx) {

        var fileList = []

        await asyncBusboy(ctx.req, {

            onFile: function(fieldname, file, fileName, encoding, mimeType) {

                const blobName = 'blob-' + tools.timestamp() + '-' + tools.hash(fileName)
                const blobPath = path.join(config.dataDir, blobName)

                file.pipe(fs.createWriteStream(blobPath))

                file.on('end', function() {
                    var type = dataType(blobPath)

                    fileList.push({
                        fileName: fileName,
                        blobName: blobName + type.ext,
                        mimeType: type.mime
                    })
                    //*** need async !!! ***//
                    fs.renameSync(blobPath, blobPath + type.ext)
                })

            }
        })

        var idList = await model.create({
            list: fileList
        })
        var dataList = await model.findIn({
            list: idList
        })
        ctx.body = {
            jsonrpc: "2.0",
            result: dataList,
            id: uuid()
        }

    }

    async function list(ctx) {
        var result = await model.list()
        ctx.body = {
            jsonrpc: "2.0",
            result: result,
            id: uuid()
        }
    }

    async function download(ctx) {
        const id = ctx.params.id

        debug('##data:download download id = ', id)
        if (isDigit(id)) {
            try {
                var profile = await model.get({
                    id: id
                })
            } catch (err) {
                console.log(err)
                return ctx.throw(404)
            }

            debug('##data:download download profile = ', profile)
            if (!profile['id']) {
                debug('##data:download not found record with id = ', id)
                return ctx.throw(404)
            }

            if (profile['blobName']) {
                var aPath = path.join(config.dataDir, profile.blobName)
                if (fs.existsSync(aPath)) {

                    debug('##data:download blob found as ', aPath)

                    ctx.set('Content-Transfer-Encoding', 'binary')
                    ctx.set('Content-Disposition', 'attachment; filename=' + profile.fileName)
                    ctx.set('Content-Type', profile.mimeType)
                    return ctx.body = fs.createReadStream(aPath)
                }
                debug('##data:download blob not found, path ', aPath)
            }
        }
        ctx.throw(404)
    }

    async function drop(ctx) {

        const id = ctx.params.id
        debug('##data:delete drop id = ', id)

        if (isDigit(id)) {
            const profile = await model.get({
                id: id
            })

            debug('##data:delete drop profile = ', profile)
            if (profile['fileName']) {
                const aPath = path.join(config.dataDir, profile.blobName)

                debug('##data:delete blob found as ', aPath)

                //*** need async !!! ***//
                if (fs.existsSync(aPath)) {
                    fs.unlinkSync(aPath)
                }

                //*** need try/catch !!! ***//
                const result = await model.drop({
                    id: id
                })

                return ctx.body = {
                    jsonrpc: "2.0",
                    result: true,
                    id: uuid()
                }
            }
            debug('##data:delete blob not found, path ', aPath)

        }
        ctx.body = {
            jsonrpc: "2.0",
            result: false,
            id: uuid()
        }
    }

    router.post('/upload', upload)
    router.get('/list', list)
    router.get('/download/:id', download)
    router.get('/drop/:id', drop)

    app.use(router.routes())
    app.use(router.allowedMethods())
    return app
}
