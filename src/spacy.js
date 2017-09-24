let SpacyBootstrapper = function () {
    return new Promise((resolve, reject) => {
        try{
            const winston = require('winston');

            global.log = new(winston.Logger)({
                transports: [new(winston.transports.Console)({
                    level: process.env['SPACY_LOG_LEVEL'] ? process.env['SPACY_LOG_LEVEL'] : 'error',
                    formatter: (options) => {
                        // OH, SO HACKY
                        // For some reason something (beats me) sets log level to info regardless what we configure above.
                        // Change it back
                        // http://www.reactiongifs.com/tom-delonge-wtf/
                        global.log.transports.console.level = process.env['SPACY_LOG_LEVEL'] ? process.env['SPACY_LOG_LEVEL'] : 'error';
                        return `[${new Date}] ${winston.config.colorize(options.level, options.level.toUpperCase())} ${options.message || ''}`
                    }
                })]
            });

            const spacyNLP = require('spacy-nlp');
            spacyNLP.server({port: process.env.IOPORT}).then(() => {
                setTimeout(() => {resolve();}, 3000);
            }).catch((e) => {
                reject(e);
            });
        } catch (e){
            reject(e);
        }
    });
};

module.exports = SpacyBootstrapper;
