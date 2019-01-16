'use strict'

const lodash = require('lodash')
const util = require('util')
const crypto = require('crypto')
const mime = require('mime')

const readChunk = require('read-chunk')
const fileType = require('file-type')
const moment = require('moment')
const fs = require('fs')
const path = require('path')

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
    return {
        ext: '.bin',
        mime: 'application/octet-stream'
    }
}

function isDigit(value) {
    return /^\d+$/.test(value)
}

module.exports = function(knex) {

    const model = require('models/data')(knex)

    function upload(req, res) {

        var list = []

        req.pipe(req.busboy)

        req.busboy.on('file', function(fieldName, file, dataName, encoding, mimeType) {
            console.log(req.head)

            const newName = 'data' + '-' + timestamp() + '-' + hash(dataName)
            const newPath = path.join(config.dataDir, newName)
            file.pipe(fs.createWriteStream(newPath))

            file.on('end', function() {
                var type = dataType(newPath)
                console.log({
                    type: type
                })
                list.push({
                    fileName: newName + type.ext,
                    dataName: dataName,
                    mimeType: type.mime,
                })
                fs.renameSync(newPath, newPath + type.ext)
            })
        })

        req.busboy.on('finish', async function() {

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

        if (isDigit(id)) {
            var profile = await model.get({
                id: id
            })

            if (profile['fileName']) {
                var path = require('path').join(config.dataDir, profile.fileName)
                if (fs.existsSync(path)) {
                    res.setHeader('Content-Transfer-Encoding', 'binary')
                    res.setHeader('Content-Disposition', 'attachment; filename=' + profile.dataName)
                    res.setHeader('Content-Type', profile.mimeType)
                    return res.sendFile(path)
                }
            }
        }
        res.status(404)
        res.send()
    }

    async function drop(req, res) {
        const id = req.params.id
        if (isDigit(id)) {
            const profile = await model.get({
                id: id
            })

            if (profile['fileName']) {
                const path = require('path').join(config.dataDir, profile.fileName)
                if (fs.existsSync(path)) {
                    fs.unlinkSync(path)
                }
                const result = await model.drop({
                    id: id
                })
                return res.send({
                    jsonrpc: "2.0",
                    result: true,
                    id: uuid()
                })
            }
        }
        res.send({
            jsonrpc: "2.0",
            result: false,
            id: uuid()
        })
    }

    router.post('/upload', upload)
    router.get('/list', list)
    router.get('/download/:id', download)
    router.get('/drop/:id', drop)

    return router
}
