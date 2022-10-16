require('dotenv').config();
const mockUsers             = require('./models/users');
const express               = require('express');
const bodyParser            = require('body-parser');
const urlencodedParser      = bodyParser.urlencoded({ extended: false })
const pino                  = require('pino-http')({
    level: process.env.LOG_LEVEL
});
const backend = express();
backend.use(pino);

const sendNotification = (u: user, message: string) => {
    u.channels.forEach((channel: number, i: number) => {
        const note = {
            channel,
            message
        }
        console.log(note);
    });
}

/**
 * Send message handler
 */
 backend.post('/process-message', urlencodedParser, function (req, res) {
    if (!req.body.message) {
        req.log.error('Invalid request: empty message');
        return res.sendStatus(400);
    }

    const selectedCategory = parseInt(req.body.category);
    const message = req.body.message;

    mockUsers.forEach((u: user, i: number) => {
        u.subscribed.forEach((category: number, ii: number) => {
            if (category === selectedCategory) {
                sendNotification(u, message);
            }
        });
        // req.log.info(u);
    });

    res.status(200)
        .send('asdsdas');
});

module.exports = backend;
