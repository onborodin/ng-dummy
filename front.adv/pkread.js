var fs = require('fs')
const {
    exec
} = require('child_process')

var obj = JSON.parse(fs.readFileSync('package.json', 'utf8'))

var str = 'npm install --save '
Object.keys(obj.dependencies).forEach(function(item) {
    if (item.match('angular')) {
        //console.log(item)
        str += ' ' + item
    }
})

Object.keys(obj.devDependencies).forEach(function(item) {
    if (item.match('angular')) {
        //console.log(item)
        str += ' ' + item
    }
})

console.log(str)

//exec(`npm install --save ${item}`, function(err, stdout, stderr) {
//    if (err) {
//        return
//    }
//    console.log(stdout)
//})
