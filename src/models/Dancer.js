module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Dancer', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
        },
        phone_number: {
            type: DataTypes.STRING
        },
        parent: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'dancers',
        freezeTableName: true,
        paranoid: true,
        underscored: true
    });
};
