'use strict'

const debug = require('debug')('daemon')
const childProcess = require('child_process')
const path = require('path')
const fs = require('fs')

module.exports = function(fileName) {

    function detach() {
        debug('#detuch process')
        function _child(exe, args, env) {
            const subprocess = childProcess.spawn(exe, args, {
                detached: true,
                stdio: ['ignore', 'ignore', 'ignore'],
                env: env
            })
            subprocess.unref()
        }

        if (process.env.__isDaemon) {
            return process.pid
        }

        var args = [].concat(process.argv)
        var node = args.shift()
        process.env.__isDaemon = true

        _child(node, args, process.env)

        return process.exit()
    }

    function writePid() {
        debug('#write process id file')
        try {
            const fd = fs.openSync(fileName, 'w')
            fs.writeSync(fd, process.pid)
            fs.closeSync(fd)
            return true
        } catch (err) {
            return false
        }
    }

    function dropPid() {
        debug('#remove process pid file')
        try {
            fs.unlinkSync(fileName);
            return true
        } catch (err) {
            return false
        }
    }

    function signalHandler() {
        debug('#set signal handlers')

        function _exit() {
            debug('#handle signal')
            dropPid()
            setTimeout(function() {
                process.exit(0)
            }, 100)
        }

        process.on('SIGINT', _exit)
        process.on('SIGTERM', _exit)

        process.on('uncaughtException', function(err) {
            if (err) {
                console.log("caughtException but no error msg" + err.stack)
                setTimeout(function() {
                    process.exit(1)
                }, 500)
            }
        })
    }

    return {
        writePid,
        dropPid,
        signalHandler,
        detach
    }
}
