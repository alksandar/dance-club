module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Payment', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        amount: {
            type: DataTypes.DOUBLE,
        },
        date: {
            type: DataTypes.DATE,
        },
        note: {
            type: DataTypes.String,
        }
    }, {
        tableName: 'payments',
        freezeTableName: true,
        paranoid: true,
        underscored: true
    });
};
