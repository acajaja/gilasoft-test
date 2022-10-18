require('dotenv').config();
const express               = require('express');
const path                  = require('path');
const pino                  = require('pino-http')({
    level: process.env.LOG_LEVEL
});
const frontend              = express();
frontend.use(express.static('public'));
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
frontend.get('/message-form', function (req, res, next) {
    res.status(200)
        .sendFile(path.join(__dirname, '../../public/form.html'));
});

module.exports = frontend;
