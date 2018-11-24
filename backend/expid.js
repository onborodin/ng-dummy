
'use strict'

var fs = require('fs')
var path = require('path')
var exdir = require('exdir')

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

var drop = function(path) {
        try {
            fs.unlinkSync(path);
            return true;
        } catch (err) {
            return false;
        }
}

var create = function(pidFile) {
    var pidDir = path.basename(path.dirname(pidFile))

    if (!exdir.writable(pidDir)) {
        console.log('Cannot write to  directory ' + pidDir + '. Exit process.')
        process.exit(1)
    }

    if (!_write(pidFile)) {
        console.log('Cannot write pid file ' + pidFile)
        process.exit(1)
    }
}

module.exports = {
    create: create,
    drop: drop
}

