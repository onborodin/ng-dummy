
var fs = require('fs')

module.exports = function(dir) {
        var dummyFile = dir + '/.dummy'

        if (fs.existsSync(dir)) {
            try {
                var fd = fs.openSync(dummyFile, 'w')
                fs.writeSync(fd, process.pid)
                fs.closeSync(fd)
                fs.unlinkSync(dummyFile)
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
