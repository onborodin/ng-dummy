
const path = require('path')
const fs = require('fs')
const util = require('util')

const mkdir = require('utils/mkdir')

module.exports = function(logDir) {

    mkdir(logDir)

    if (!mkdir(logDir)) {
        console.log('Cannot write to log directory ' + logDir + '. Exit process.')
        process.exit(1)
    }

    var consoleLog = function(data) {
        var date = new Date().toISOString()
        const logFile = fs.createWriteStream(logDir + '/debug.log', {flags : 'a'})
        const logStdout = process.stdout
        logFile.write(date + ' ' + util.format(data) + '\n')
        logStdout.write(date + ' ' + util.format(data) + '\n')
    }

    return consoleLog
}
