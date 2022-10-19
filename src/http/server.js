import app from './app.js';
require('dotenv').config();
const http          = require('http');
const pino          = require('pino')({
    level: process.env.LOG_LEVEL
});
const server        = http.createServer(app);

server.listen(process.env.NODE_DOCKER_PORT);
pino.info(`Front-end server running at http://${process.env.APP_HOST}:${process.env.NODE_DOCKER_PORT}/`);
