let express = require('express');
let bodyParser = require('body-parser');

let index = require('./routes/index');

let app = express();

app.use(bodyParser.json());
app.use(function (error, req, res, next) {
    if (error instanceof SyntaxError) {
        res.status(400);
        res.send({message: "Malformed JSON document"});
    } else {
        next();
    }
});
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', index);

app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message || err);
});

module.exports = app;
