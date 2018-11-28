const child_process = require('child_process')


module.exports = function(nodeBin) {

    function child(exe, args, env) {
        const child = child_process.spawn(exe, args, {
            detached: true,
            stdio: ['ignore', 'ignore', 'ignore'],
            env: env
        })
        child.unref()
        return child
    }

    if (process.env.__daemon) {
        return process.pid
    }
    process.env.__daemon = true

    var args = [].concat(process.argv)
    var node = args.shift()
    var env = process.env
    child(node, args, env)
    return process.exit()
}