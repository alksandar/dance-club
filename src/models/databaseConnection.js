const config = require('./../utils/config');
const Sequelize = require('sequelize');

/**
 * Simple connection singleton class by accessing the db instance like this: DatabaseConnection.db
 */
class DatabaseConnection {
    /**
     * Empty constructor.
     * @returns {sequelize} returns the current instance or exits the server process with -1 if a
     * connection cannot be established
     *
     * The connection string must be defined as an env var DATABASE_URI, which is read by the
     * config npm module, configured under the ./config files
     */
    constructor() {
        if (!DatabaseConnection.instance) {
            /**
             * Database ORM for accessing models and the database by Sequelize
             * @type {Sequelize}
             */

            this.db = new Sequelize(config.get('db.url'), {
                dialect: 'postgres',
                protocol: 'postgres',
                dialectOptions: {
                    ssl: config.get('db.ssl'),
                },
                define: {
                    timestamps: true,
                },
                logging: console.log
            });

            DatabaseConnection.instance = this;
            return DatabaseConnection.instance;
        }
    }
}

const Instance = new DatabaseConnection();
Object.freeze(Instance);

module.exports = Instance;
