let express = require('express');
let router = express.Router();
const spacyNLP = require('spacy-nlp');
const nlp = spacyNLP.nlp;
let fs = require('fs');

router.get('/', (req, res, next) => {
    try {
        fs.readFile('/etc/spacy_info', 'utf8', function (err, fileContents) {
            if (err) {
                next(err);
            }

            let response = {
                title: 'SpaCy JSON service',
                spacyInfo: {}
            };

            let spacyInfoKeys = ["Name", "Version" ];

            let lines = fileContents.split(/\r?\n/);

            for (let line of lines) {
                let splits = line.split(':');
                if (splits.length === 2 && splits[0] && splits[1] && spacyInfoKeys.indexOf(splits[0].trim()) !== -1) {
                    response.spacyInfo[splits[0].trim().toLowerCase()] = splits[1].trim();
                }
            }

            response.spacyInfo['website'] = "https://spacy.io/";

            res.send(response);
        });
    } catch (e) {
        next(e);
    }
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
        let error = {message: "Missing field: input"};
        error.status = 400;
        next(error);
    }
});

module.exports = router;
