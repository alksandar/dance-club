module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Group', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'groups',
        freezeTableName: true,
        paranoid: true,
        underscored: true
    });
};
