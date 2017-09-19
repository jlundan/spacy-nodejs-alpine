let express = require('express');
let router = express.Router();
const spacyNLP = require('spacy-nlp');
const nlp = spacyNLP.nlp;

router.get('/', (req, res) => {
    res.send({title: 'SpaCy JSON service'});
});

router.post('/', (req, res, next) => {
    let body = req.body;

    if (body && body.input) {
        nlp.parse(body.input).then((output) => {
            res.send(output[0]);
        }).catch((e) => {
            next(e);
        });
    } else {
        let error = { message: "Missing field: input" };
        error.status = 400;
        next(error);
    }
});

module.exports = router;
