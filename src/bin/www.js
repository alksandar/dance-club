/**
 * Main entry point for dance-club server.
 */

require("@babel/core");
require("@babel/polyfill");
require('@babel/register')

const app = require('./../app');
const http = require('http');
const DatabaseConnection = require('./../models/databaseConnection');
const config = require('./../utils/config');
const logger = require('./../utils/logger');
const moment = require('moment');

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
const port = normalizePort(config.get('port'))
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Verify database connection
 */
DatabaseConnection.db.authenticate()
    .then(() => {
        logger.info(`${moment(new Date()).toISOString()} Database connection has been established successfully.`);
        server.listen(port, '0.0.0.0');
    })
    .catch((err) => {
        logger.warn(`${moment(new Date()).toISOString()} Unable to connect to the database: ${JSON.stringify(err)}`);
        return process.exit(1);
    });

server.on('error', (error) => {
    /**
     * Event listener for HTTP server "error" event.
     */
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
});

/**
 * Listen on provided port, on all network interfaces.
 */
server.on('listening', () => {
    /**
     * Event listener for HTTP server "listening" event.
     */
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;
    // debug(`Listening on ${bind}`);

    logger.info(`${moment(new Date()).toISOString()} Server is up and running on env=[${config.get('env')}] address=[${addr.address}] port=[${port}]`);
});
