import { Dancer } from './../models/tables';

const createDancer = function (first_name, last_name, phone_number, parent) {
    return new Promise((resolve, reject) => {
        Dancer.create({
            first_name,
            last_name,
            phone_number,
            parent
        }).then((dancer) => {
            resolve(dancer);
        }).catch((err) => {
            reject(err);
        });
    });
};

const updateDancer = function (id, first_name, last_name, phone_number, parent) {
    return new Promise((resolve, reject) => {
        let toUpdate = {};
        if (first_name) toUpdate.first_name = first_name;
        if (last_name) toUpdate.last_name = last_name;
        if (phone_number) toUpdate.phone_number = phone_number;
        if (parent) toUpdate.parent = parent;

        Dancer.update(toUpdate, {
            where: {
                id: id
            }
        }).then((dancer) => {
            resolve(dancer);
        }).catch((err) => {
            reject(err);
        });
    });
};

const getDancer = function (id) {
    return new Promise((resolve, reject) => {
        Dancer.findById(id)
            .then((dancer) => {
                resolve(dancer);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const getDancers = function () {
    return new Promise((resolve, reject) => {
        Dancer.findAll()
            .then((dancers) => {
                resolve(dancers);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const addToGroup = function (dancer_id, group_id) {
    return new Promise((resolve, reject) => {
        Dancer.update({ id: dancer_id }, { group_id: group_id })
            .then((dancer) => {
                resolve(dancer);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const deleteDancer = function (id) {
    return new Promise((resolve, reject) => {
        Dancer.destroy({
            where: {
                id: id
            }
        }).then(() => resolve(null))
          .catch((err) => reject(err));
    });
};

export {
    createDancer,
    updateDancer,
    getDancer,
    getDancers,
    addToGroup,
    deleteDancer
}