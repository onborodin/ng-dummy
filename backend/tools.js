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

function writable(dir) {
    var dummy = path.join(dir, '.dummy')
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

function mkdir(dir) {

    var dummy = path.join(dir, '.dummy')

    if (fs.existsSync(dir)) {
        return writable(dir)
    }

    try {
        fs.mkdirSync(dir)
        return true
    } catch(err) {
        return false
    }
}

module.exports = {
    hash,
    timestamp,
    mkdir
}
