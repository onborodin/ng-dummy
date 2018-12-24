var fs = require('fs')
const {
    exec
} = require('child_process')

var obj = JSON.parse(fs.readFileSync('package.json', 'utf8'))

var str = 'npm install --save '
Object.keys(obj.dependencies).forEach(function(item) {
    if (item.match('angular')) {
        str += ' ' + item
    }
})

Object.keys(obj.devDependencies).forEach(function(item) {
    if (item.match('angular')) {
        str += ' ' + item
    }
})

console.log(str)

