require('dotenv').config();
const express               = require('express');
const bodyParser            = require('body-parser');
const urlencodedParser      = bodyParser.urlencoded({ extended: false });
const path                  = require('path');
const pino                  = require('pino-http')({
    level: process.env.LOG_LEVEL
});
const frontend = express();
frontend.use(pino)

/**
 * favicon route.
 * Passes the request on through.
 */
 frontend.use('/favicon.ico', function (req, res, next) {
    res.sendStatus(204);
    next();
});

/**
 * Message form route
 */
 frontend.get('/send-sms', function (req, res, next) {
    res.status(200)
        .sendFile(path.join(__dirname, '../public/sms-form.html'));
});
frontend.get('/send-email', function (req, res, next) {
    res.status(200)
        .sendFile(path.join(__dirname, '../public/email-form.html'));
});
frontend.get('/send-push', function (req, res, next) {
    res.status(200)
        .sendFile(path.join(__dirname, '../public/push-form.html'));
});

module.exports = frontend;
