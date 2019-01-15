'use strict'

const asyncBusboy = require('async-busboy')
const moment = require('moment')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

function hash(string) {
    return crypto.createHmac('md5', string + Math.random()).digest('hex')
}

function timestamp() {
    return moment().format('YYYYMMDDhhmmss')
}

function mkdir(dir) {

    var dummy = path.join(dir, '.dummy')

    if (fs.existsSync(dir)) {
        try {
            var fd = fs.openSync(dummy, 'w')
            fs.writeSync(fd, 'dummy')
            fs.closeSync(fd)
            fs.unlinkSync(dummy)
            return true
        } catch (err) {
            return false
        }
    }

    if (!fs.existsSync(dir)) {
        try {
            fs.mkdirSync(dir)
            return true
        } catch {
            return false
        }
    }
}

module.exports = {
    hash,
    timestamp,
    mkdir
}
