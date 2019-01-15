'use strict'

const childProcess = require('child_process')

function daemon() {

    function detach(exe, args, env) {
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

    detach(node, args, process.env)

    return process.exit()
}

module.exports = daemon
