import { Payment } from './../models/tables';

const makePayment = function (dancer_id, amount, date, note) {
    return new Promise((resolve, reject) => {
        Payment.create({
            dancer_id,
            amount,
            date,
            note,
        }).then((payment) => {
            resolve(payment);
        }).catch((err) => {
            reject(err);
        });
    });
};

const getDancersPayments = function (dancer_id) {
    return new Promise((resolve, reject) => {
        Payment.findAll({
            where: {
                dancer_id: dancer_id
            }
        }).then((payment) => {
            resolve(payment);
        }).catch((err) => reject(err));
    });
};

const getPayments = function () {
    return new Promise((resolve, reject) => {
        Payment.findAll()
            .then((payments) => {
                resolve(payments);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export {
    makePayment,
    getDancersPayments,
    getPayments
}