'use strict';
const fs = require('fs');
const util = require('util');
const path = require('path');
function logger(config) {
    return async function (ctx, next) {
        const start = process.hrtime();
        const stamp = new Date().toISOString();
        return next()
            .then(function () {
            let delta = process.hrtime(start);
            delta = delta[0] * 1000 + delta[1] / 1000000;
            delta = Math.round(delta);
            const req = ctx.request;
            const res = ctx.response;
            const record = `${req.ip} ${req.method}` +
                ` ${req.protocol}://${req.header.host} ${req.url}` +
                ` ${req.type} ${delta}ms ${res.status} ${res.message}`;
            const logPath = path.join(config.logDir, 'access.log');
            const logStream = fs.createWriteStream(logPath, { flags: 'a' });
            logStream.write(`${stamp} ${record}\n`);
            console.log(record);
        });
    };
}
module.exports = logger;
