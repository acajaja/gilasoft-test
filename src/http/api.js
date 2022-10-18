import backend from './back-end.js';

require('dotenv').config();
const http          = require('http');
const pino          = require('pino')({
    level: process.env.LOG_LEVEL
});
const server        = http.createServer(backend);

server.listen(process.env.NODE_LOCAL_PORT_REAR);
pino.info(`Server running at http://${process.env.APP_HOST}:${process.env.NODE_LOCAL_PORT_REAR}/`);
