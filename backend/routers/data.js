'use strict'

const lodash = require('lodash')
const path = require('path')
const util = require('util')
const crypto = require('crypto')
const mime = require('mime')

const busboy = require('connect-busboy')
const readChunk = require('read-chunk')
const fileType = require('file-type')
const moment = require('moment')
const fs = require('fs')

const router = require('express').Router()

const config = require('lorem.conf')

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

function dataType(path) {
    const buffer = readChunk.sync(path, 0, fileType.minimumBytes)
    const type = fileType(buffer)
    if (type !== null) {
        type.ext = '.' + type.ext
        return type
    }
    return { ext: '.bin', mime: 'application/octet-stream' }
}


module.exports = function(knex) {

    const model = require('models/data')(knex)


    function upload(req, res) {

        var list = []

        req.pipe(req.busboy)

        req.busboy.on('file', function(fieldName, file, dataName, encoding, mimeType) {

            const newName = 'data' + '-' + timestamp() + '-' + hash(dataName)
            const newPath = path.join(config.dataDir, newName)
            file.pipe(fs.createWriteStream(newPath))

            file.on('end', function() {
                var type = dataType(newPath)
                console.log({ type: type })
                list.push({
                    fileName: newName + type.ext,
                    dataName: dataName,
                    mimeType: type.mime,
                })
                fs.renameSync(newPath, newPath + type.ext)
            })
        })

        req.busboy.on('finish', async function() {
            console.log(list)
            var idList = await model.create({
                list: list
            })
            var dataList = await model.findIn({
                list: idList
            })
            res.send({
                jsonrpc: "2.0",
                result: dataList,
                id: uuid()
            })
        })
    }

    async function list(req, res) {
        var result = await model.list()
        res.send({
            jsonrpc: "2.0",
            result: result,
            id: uuid()
        })
    }

    async function download(req, res) {
        const id = req.params.id
        var profile = await model.get({ id: id })
        console.log({ profile: profile })

        if (profile['fileName']) {
            var path = require('path').join(config.dataDir, profile.fileName)
            console.log({ path0: path })

            if (fs.existsSync(path)) {
                console.log({ path: path })

                res.setHeader('Content-Transfer-Encoding', 'binary')
                res.setHeader('Content-Disposition', 'attachment; filename=' + profile.dataName)
                res.setHeader('Content-Type', profile.mimeType)
                res.sendFile(path)
            } else {
                res.sendStatus(404)
            }
        } else {
            res.sendStatus(404)
        }
    }

    router.post('/upload', upload)
    router.get('/list', list)
    router.get('/download/:id', download)

    return router
}