const DataTypes = require('sequelize').DataTypes;
const DatabaseConnection = require('./databaseConnection');

// Models
const Dancer = require('./Dancer')(DatabaseConnection.db, DataTypes);
const Group = require('./Group')(DatabaseConnection.db, DataTypes);
const Payment = require('./Payment')(DatabaseConnection.db, DataTypes);

/**
 * Define relations
 */
Group.hasMany(Dancer, { onDelete: 'set null', as: 'dancers' });
Dancer.hasMany(Payment, { onDelete: 'set null', as: 'dancerPayments' });

module.exports.Dancer = Dancer;
module.exports.Group = Group;
module.exports.Payment = Payment;
