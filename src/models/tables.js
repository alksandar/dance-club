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

// if not exist, create table
// force will drop the table and recreate it if any table is available
Dancer.sync();
Group.sync();
Payment.sync();

module.exports.Dancer = Dancer;
module.exports.Group = Group;
module.exports.Payment = Payment;
