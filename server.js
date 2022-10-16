require('dotenv').config();

const http          = require('http');
const api           = require('./src/front-end');
const pino          = require('pino')({
    level: process.env.LOG_LEVEL
});
const server        = http.createServer(api);

server.listen(process.env.NODE_DOCKER_PORT);
pino.info(`Server running at http://${process.env.APP_HOST}:${process.env.NODE_DOCKER_PORT}/`);
