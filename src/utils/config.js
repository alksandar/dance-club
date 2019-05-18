const convict = require('convict');

require('dotenv').config();

const config = convict({
    env: {
        doc: 'The server environment.',
        format: ['production', 'development', 'local'],
        default: 'local',
        env: 'ENV'
    },
    port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 4000,
        env: 'APP_PORT',
    },

    db: {
        ssl: {
            doc: 'Support for ssl',
            format: Boolean,
            default: false,
            env: 'DB_SSL'
        },
        url: {
            doc: 'Database uri',
            format: String,
            default: null,
            env: 'DATABASE_URL'
        }
    },
});

module.exports = config;
