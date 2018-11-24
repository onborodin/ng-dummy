
const expid = require('expid')

module.exports = function(pidFile) {

    function _exit() {
        expid.drop(pidFile)
        setTimeout(function() { 
            process.exit(0)
        }, 100)
    }

    process.on('SIGINT', _exit)
    process.on('SIGTERM', _exit)

    process.on('uncaughtException', function (err) {
        if (err) {
            console.log("caughtException but no error msg" + err.stack)
            setTimeout(function() { 
                process.exit(1)
            }, 500)
        }
    })
}
