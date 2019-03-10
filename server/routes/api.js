
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://gbalogh:u47ECfDMlzKLFl6d@gbalogh-personal-shard-00-00-jv4wv.mongodb.net:27017,gbalogh-personal-shard-00-01-jv4wv.mongodb.net:27017,gbalogh-personal-shard-00-02-jv4wv.mongodb.net:27017/accounting?ssl=true&replicaSet=gbalogh-personal-shard-0&authSource=admin', (err, client) => {
        if (err) return console.log(err);

        closure(client.db('accounting'));
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get transactions
router.get('/transactions', (req, res) => {
    console.log('Loading transaction list');
    connection((db) => {
        db.collection('transactions')
            .find()
            .toArray()
            .then((transactions) => {
                let resp = Object.assign({}, response);
                resp.data = transactions;
                resp.data.forEach(t => console.log(t));
                console.log('Loaded ' + resp.data.length + ' transacion(s)');
                res.json(resp);
            })
            .catch((err) => {
                console.log('Failed to load transactions: ' + err);
                sendError(err, res);
            });
    });
});

router.post('/transaction', (req,res) => {
    let t = req.body;
    t._id = new ObjectID();

    console.log('Saving new transaction: ' + t);
    connection((db) => {
        db.collection('transactions').save(t).then(() => {
            let resp = Object.assign({}, response);
            res.json(resp);
            console.log('New transaction saved');
        }).catch((err) => {
            console.log('Failed to save transaction: ' + err);
            sendError(err, res);
        });
    });
});

router.put('/transactions', (req, res) => {
    console.log('Updating transaction(s)');
    connection((db) => {
        Promise.all(req.body.map(t => {
            t._id = new ObjectID(t._id);
            db.collection('transactions').save(t);
        })).then(() => {
            let resp = Object.assign({}, response);
            res.json(resp);
            console.log('Updated transaction(s)');
        }).catch((err) => {
            console.log('Failed to update transaction: ' + err);
            sendError(err, res);
        });
    });
});

router.delete('/transactions', (req, res) => {
    console.log('Deleting transaction(s)');
    connection((db) => {
        Promise.all(req.body.map(t => {
            t._id = new ObjectID(t._id);
            db.collection('transactions').deleteOne(t);
        })).then(() => {
            let resp = Object.assign({}, response);
            res.json(resp);
            console.log('Deleted transaction(s)');
        }).catch((err) => {
            console.log('Failed to delete transaction: ' + err);
            sendError(err, res);
        });
    });
});

module.exports = router;