'use strict';
const debug = require('debug')('session');
const crypto = require('crypto');
const fs = require('fs');
const util = require('util');
const path = require('path');
const os = require('os');
const uuid = require('uuid/v4');
const lodash = require('lodash');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const open = util.promisify(fs.open);
const unlink = util.promisify(fs.unlink);
module.exports = function (customOptions) {
    var defaultOptions = {
        cookieName: 'session',
        autoRenewal: true,
        maxAge: 10 * 60 * 1000,
        domain: '',
        httpOnly: false,
        runDir: os.tmpdir()
    };
    const opt = lodash.defaultsDeep(customOptions, defaultOptions);
    function getFileName(sessionId) {
        return path.join(opt.runDir, sessionId + '.json');
    }
    async function getSessionData(sessionId) {
        const fileName = getFileName(sessionId);
        var sessionData = null;
        try {
            var buffer = await readFile(fileName);
            if (buffer)
                sessionData = JSON.parse(buffer);
        }
        catch (err) { }
        return sessionData;
    }
    async function storeSessionData(sessionId, data) {
        try {
            const fileName = getFileName(sessionId);
            await writeFile(fileName, JSON.stringify(data, null, 4));
        }
        catch (err) {
            debug('#error store session data', err);
        }
    }
    async function deleteSessionData(sessionId) {
        try {
            const fileName = getFileName(sessionId);
            await unlink(fileName);
        }
        catch (err) { }
    }
    return async function (ctx, next) {
        var sessionId = ctx.cookies.get(opt.cookieName);
        debug(`#received session id ${sessionId}`);
        var sessionData = {};
        var expiries = 0;
        if (sessionId) {
            sessionData = await getSessionData(sessionId);
            if (sessionData !== null && sessionData.expiries) {
                if ((sessionData.expiries - Date.now()) > 0) {
                    debug('#session still relevant');
                    if (sessionData && sessionData.session) {
                        ctx.state.session = sessionData.session;
                        expiries = sessionData.expiries;
                    }
                }
                else {
                    debug('#session expired');
                    sessionId = null;
                    ctx.state.session = null;
                    sessionData = null;
                }
            }
        }
        if (sessionData === null)
            sessionData = {};
        await next();
        if (ctx.state.session != null) {
            var nextSessionId = '';
            var nextExpiries = 0;
            if (sessionId) {
                nextSessionId = sessionId;
                debug(`#use prevention session id ${nextSessionId}`);
            }
            else {
                nextSessionId = crypto.createHmac('md5', uuid()).digest('hex');
                debug(`#create new session id ${nextSessionId}`);
            }
            if (opt.autoRenewal) {
                var cookieOptions = {
                    overwrite: true,
                    maxAge: opt.maxAge,
                    httpOnly: opt.httpOnly,
                    domain: opt.domain
                };
                ctx.cookies.set(opt.cookieName, nextSessionId, cookieOptions);
                nextExpiries = Date.now() + opt.maxAge;
            }
            else {
                nextExpiries = expiries;
            }
            const nextSessionData = {
                sessionId: nextSessionId,
                expiries: nextExpiries,
                session: ctx.state.session
            };
            storeSessionData(nextSessionId, nextSessionData);
        }
        else {
            if (sessionId) {
                ctx.cookies.set(opt.cookieName, null, {
                    maxAge: 0,
                    httpOnly: false
                });
                deleteSessionData(sessionId);
                debug(`#delete old session data ${sessionId}`);
            }
        }
    };
};
