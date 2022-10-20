import logger from '../db/logger.js';
import notify from '../notify.js';
import categories from '../categories.js';
import channels from '../channels.js';
require('dotenv').config();
const express               = __non_webpack_require__('express');
const bodyParser            = require('body-parser');
const urlencodedParser      = bodyParser.urlencoded({ extended: false });
const pino                  = require('pino-http')({
    level: process.env.LOG_LEVEL
});
const server              = express();
server.use(pino)
server.use(express.static('public'));
server.set('view engine', 'pug');
server.set('views', './src/views');

/**
 * favicon route.
 * Passes the request on through.
 */
server.use('/favicon.ico', (req, res, next) => {
    res.sendStatus(204);
    next();
});

/**
 * Message form route
 */
server.get('/', (req, res) => {
    res.render('form', {
        categories
    });
});

/**
 * Message form route
 */
server.get('/logs', async (req, res) => {
    const logs = logger.getLogs();

    res.render('logs', {
        logs,
        categories,
        channels
    });
});

/**
 * Send message handler
 */
server.post('/process-message', urlencodedParser, async (req, res) => {
    const message = req.body.message ||= '';

    if (!message) {
        req.log.error('Invalid request: empty message');
        return res.sendStatus(400);
    }

    const selectedCategory = parseInt(req.body.category);

    await notify(selectedCategory, message);

    res.render('success');
});

export default server;
