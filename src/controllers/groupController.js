import { Group, Dancer } from './../models/tables';

const createGroup = function (name) {
    return new Promise((resolve, reject) => {
        Group.create({
            name
        }).then((group) => {
            resolve(group);
        }).catch((err) => {
            reject(err);
        });
    });
};

const updateGroup = function (id, name) {
    return new Promise((resolve, reject) => {

        Group.update({ name: name}, {
            where: {
                id: id
            }
        }).then((group) => {
            resolve(group);
        }).catch((err) => {
            reject(err);
        });
    });
};

const getGroupDancers = function (id) {
    return new Promise((resolve, reject) => {
        console.log('Fetching group dancers....')
        Group.findByPk(id, {
                include: [
                    {
                        model: Dancer,
                        as: 'dancers'
                    }
                ]
        }).then((group) => {
            console.log('Resolved')
            resolve(group);
        }).catch((err) => {
            console.log('not resolved')
            console.log('ERROR IS: ', err);
            reject(err);
        });
    });
};

const deleteGroup = function (id) {
    return new Promise((resolve, reject) => {
        Group.destroy({
            where: {
                id: id
            }
        }).then(() => {
            resolve(null);
        }).catch((err) => {
            reject(err);
        });
    });
};

const getGroups = function () {
    return new Promise((resolve, reject) => {
        Group.findAll().then((groups) => {
            resolve(groups);
        }).catch((err) => reject(err));
    });
};

export {
    createGroup,
    deleteGroup,
    updateGroup,
    getGroupDancers,
    getGroups
}
