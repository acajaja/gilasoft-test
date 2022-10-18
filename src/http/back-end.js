import notify from '../notify.js';
require('dotenv').config();
const express               = __non_webpack_require__('express');
const bodyParser            = require('body-parser');
const urlencodedParser      = bodyParser.urlencoded({ extended: false })
const pino                  = require('pino-http')({
    level: process.env.LOG_LEVEL
});
const backend               = express();
backend.use(pino);

/**
 * favicon route.
 * Passes the request on through.
 */
backend.use('/favicon.ico', function (req, res, next) {
    res.sendStatus(204);
    next();
});

/**
 * Send message handler
 */
backend.post('/process-message', urlencodedParser, async (req, res) => {
    const message = req.body.message ||= '';

    if (!message) {
        req.log.error('Invalid request: empty message');
        return res.sendStatus(400);
    }

    const selectedCategory = parseInt(req.body.category);

    await notify(selectedCategory, message);

    res.status(200)
        .send('Message sent');
});

export default backend;
