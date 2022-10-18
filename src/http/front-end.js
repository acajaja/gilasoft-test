import logger from '../db/logger.js';
require('dotenv').config();
const express               = __non_webpack_require__('express');
const path                  = require('path');
const pino                  = require('pino-http')({
    level: process.env.LOG_LEVEL
});
const frontend              = express();
frontend.use(pino)

/**
 * favicon route.
 * Passes the request on through.
 */
frontend.use('/favicon.ico', (req, res, next) => {
    res.sendStatus(204);
    next();
});

/**
 * Message form route
 */
frontend.get('/message-form', (req, res) => {
    res.status(200)
        .sendFile(path.join(__dirname, '../../public/form.html'));
});

/**
 * Message form route
 */
frontend.get('/logs', async (req, res) => {
    const logs = logger.getLogs();

    res.status(200)
        .send(logs);
});

export default frontend;
