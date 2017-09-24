let express = require('express');
let router = express.Router();
const spacyNLP = require('spacy-nlp');
const nlp = spacyNLP.nlp;
let fs = require('fs');
let Promise = require('bluebird');
let ResponseFilter = require('../util/response-filter');

router.get('/', (req, res, next) => {
    try {
        fs.readFile('/etc/spacy_info', 'utf8', function (err, fileContents) {
            if (err) {
                next(err);
            }

            let response = {
                title: 'spaCy JSON service',
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
        return next(e);
    }
});

router.post('/', (req, res, next) => {
    let body = req.body;

    if(!body) {
        let error = {message: "Missing request body"};
        error.status = 400;
        return next(error);
    }

    if(typeof body.input === "undefined") {
        let error = {message: "Missing field: input"};
        error.status = 400;
        return next(error);
    }

    if(body.input === "" || (Array.isArray(body.input) && body.input.length === 0)) {
        res.send([]);
        return;
    }

    if(body.exclude && !Array.isArray(body.exclude)) {
        let error = {message: "Exclude parameter must be an array"};
        error.status = 400;
        return next(error);
    }

    let responseFilter = new ResponseFilter(body.exclude);

    if (Array.isArray(body.input)) {
        let requests = [];
        for (let item of body.input) {
            requests.push(nlp.parse(item));
        }
        Promise.all(requests).then((responses) => {
            res.send(responses.map((response) => {
                if(!response || !Array.isArray(response) || response.length === 0) {
                    return [];
                }
                return responseFilter.filter(response[0]);
            }));
        }).catch((e) => {
            return next(e);
        });
    } else {
        try{
            nlp.parse(body.input).then((response) => {
                if(!response || !Array.isArray(response) || response.length === 0) {
                    res.send([]);
                    return;
                }
                res.send([responseFilter.filter(response[0])]);
            }).catch((e) => {
                return next(e);
            });
        } catch (err){
            return next(err);
        }

    }
});

module.exports = router;
