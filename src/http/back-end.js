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
 * Send message handler
 */
backend.post('/process-message', urlencodedParser, async function (req, res) {
    const message = req.body.message ||= '';

    if (!message) {
        req.log.error('Invalid request: empty message');
        return res.sendStatus(400);
    }

    const selectedCategory = parseInt(req.body.category);

    await notify(selectedCategory, message);

    res.status(200)
        .send('asdsdas');
});

export default backend;
