import {Router} from 'express';
import {createDancer, deleteDancer, getDancer, getDancers, updateDancer} from "../controllers/dancerController";

const dancerRouter = new Router({strict: true});

dancerRouter.get('/', (req, res) => {
    getDancers().then((dancers) => {
        res.status(200).json({ dancers });
    }).catch((err) => {
        res.status(500).json({ errors: ['Something went wrong.'] });
    });
});

dancerRouter.get('/:id', (req, res) => {
    getDancer(req.query.id).then((dancer) => {
        if (!dancer) {
            res.status(404).json({ errors: [`Dancer with id: ${req.query.id} could not be found.`] });
        }
        res.status(200).json({ dancer });
    }).catch((err) => {
        res.status(500).json({ errors: ['Something went wrong.'] });
    });
});

dancerRouter.post('/add', (req, res) => {
    createDancer(req.body.first_name, req.body.last_name, req.body.phone_number, req.body.parent)
        .then((dancer) => {
            res.status(201).json({dancer});
        })
        .catch((err) => {
            res.status(500).json({errors: ['Something went wrong.']});
        });
});

dancerRouter.put('/edit/:id', (req, res) => {
    if (!req.query.id) {
        res.status(400).json({ errors: ['Dancer id must be provided in order to edit.']});
    }

    updateDancer(req.query.id, req.body.first_name, req.body.last_name, req.body.phone_number, req.body.parent)
        .then((dancer) => {
            res.status(200).json({dancer});
        })
        .catch((err) => {
            res.status(500).json({errors: ['Something went wrong.']});
        });
});

dancerRouter.delete('/delete/:id', (req, res) => {
    if (!req.query.id) {
        res.status(400).json({errors: ['Dancer id must be provided in order to delete.']});
    }

    deleteDancer(req.query.id)
        .then(() => {
            res.status(202);
        })
        .catch((err) => {
            res.status(500).json({errors: ['Something went wrong.']});
        });
});
