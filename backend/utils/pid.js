'use strict'

var path = require('path')
var fs = require('fs')

var mkdir = require('utils/mkdir')

var create = function(pidFile) {
    var pidDir = path.basename(path.dirname(pidFile))

    var _write = function(path) {
        try {
            var fd = fs.openSync(path, 'w')
        } catch (err) {
            return false;
        }
        fs.writeSync(fd, process.pid)
        fs.closeSync(fd)
        return true
    }

    if (!mkdir(pidDir)) {
        console.log('Cannot write to  directory ' + pidDir + '. Exit process.')
        process.exit(1)
    }

    if (!_write(pidFile)) {
        console.log('Cannot write pid file ' + pidFile)
        process.exit(1)
    }
}

var drop = function(path) {
    try {
        fs.unlinkSync(path);
        return true;
    } catch (err) {
        return false;
    }
}

module.exports = {
    create: create,
    drop: drop
}
