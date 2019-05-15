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
        Group.findById(id, {
            include: [
                {
                    model: Dancer,
                    as: 'dancers'
                }
            ]
        }).then((group) => {
            resolve(group);
        }).catch((err) => {
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

export {
    createGroup,
    deleteGroup,
    updateGroup,
    getGroupDancers
}