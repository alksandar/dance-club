import {Router} from 'express';
import {deletePayment, getDancersPayments, getPayments, makePayment} from "../controllers/paymentController";

const paymentRouter = new Router({strict: true});

paymentRouter.get('/', (req, res) => {
    getPayments().then((payments) => {
        res.status(200).json({payments});
    }).catch((err) => {
        res.status(500).json({errors: ['Something went wrong.']});
    });
});

paymentRouter.get('/:id', (req, res) => {
    getDancersPayments(req.query.id)
        .then((payment) => {
            if (!payment) {
                res.status(404).json({errors: [`No payment for dancer with id: ${req.query.id} found`]});
            }

            res.status(200).json({payment});
        })
        .catch((err) => {
            res.status(500).json({errors: ['Something went wrong.']});
        });
});

paymentRouter.post('/addpayment', (req, res) => {
    makePayment(req.body.dancer_id, req.body.amount, req.body.date, req.body.note)
        .then((payment) => {
            res.status(202).json({payment});
        })
        .catch((err) => {
            res.status(500).json({errors: ['Something went wrong.']});
        });
});

paymentRouter.delete('/:id', (req, res) => {
    if (!req.query.id) {
        res.status(400).json({errors: ['Payment id must be provided in order to delete.']});
    }

    deletePayment(req.query.id).then(() => {
        res.status(202);
    }).catch((err) => {
        res.status(500).json({errors: ['Something went wrong.']});
    });
});

export default paymentRouter;
