import {Router} from 'express';
import {createGroup, deleteGroup, getGroupDancers, getGroups} from "../controllers/groupController";
import {addToGroup, removeFromGroup} from "../controllers/dancerController";

const groupRouter = new Router({strict: true});

groupRouter.get('/', (req, res) => {
    getGroups().then((groups) => {
        res.status(200).json({groups});
    }).catch((err) => {
        res.status(500).json({errors: ['Something went wrong.']});
    });
});

groupRouter.get('/:id/dancers', (req, res) => {
    if (!req.params.id) {
        res.status(400).json({errors: ['Id of group must be provided to get dancers.']});
    }

    getGroupDancers(req.params.id)
        .then((group) => {
            if (!group) {
                res.status(404).json({errors: [`Group with id: ${req.params.id} could not be found.`]});
            }
            res.status(200).json({group});
        })
        .catch((err) => {
            res.status(500).json({errors: ['Something went wrong.']});
        });
});

groupRouter.post('/create', (req, res) => {
    createGroup(req.body.name)
        .then((group) => {
            res.status(201).json({group});
        })
        .catch((err) => {
            res.status(500).json({errors: ['Something went wrong.']});
        });
});

groupRouter.delete('/delete/:id', (req, res) => {
    if (!req.params.id) {
        res.status(400).json({errors: 'Group id must be provided in order to delete group.'});
    }

    deleteGroup(req.params.id)
        .then(() => {
            res.status(202);
        })
        .catch((err) => {
            res.status(500).json({errors: ['Something went wrong.']});
        });
});

groupRouter.post('/:group_id/add/:dancer_id', (req, res) => {
    if (!req.params.dancer_id) {
        res.status(400).json({errors: 'Dancer id must be provided in order to add to group.'});
    }

    if (!req.params.group_id) {
        res.status(400).json({errors: 'Group id must be provided in order to add to group.'});
    }

    addToGroup(req.params.dancer_id, req.params.group_id)
        .then(() => {
            res.status(202).json();
        })
        .catch((err) => {
            res.status(500).json({errors: ['Something went wrong.']});
        });
});

groupRouter.delete('/remove/dancer/:id', (req, res) => {
    if (!req.params.id) {
        res.status(400).json({errors: 'Dancer id must be provided in order to add to group'});
    }

    removeFromGroup(req.params.id)
        .then(() => {
            res.status(202).json();
        })
        .catch((err) => {
            res.status(500).json({errors: ['Something went wrong.']});
        });
});

export default groupRouter;
