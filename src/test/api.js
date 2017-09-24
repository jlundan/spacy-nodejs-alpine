process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Api', () => {
    describe('Process sentences', () => {
        it('it should process single sentence', (done) => {
            let request = {
                input: "This is a test."
            };
            chai.request(server)
                .post('/')
                .send(request)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('array').that.has.lengthOf(1);
                    res.body[0].should.have.all.keys('text', 'len', 'tokens', 'noun_phrases', 'parse_tree', 'parse_list');
                    done();
                });
        });
        it('it should process multiple sentences', (done) => {
            let request = {
                input: ["This is a test.", "This another test."]
            };
            chai.request(server)
                .post('/')
                .send(request)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('array').that.has.lengthOf(2);
                    res.body[0].should.have.all.keys('text', 'len', 'tokens', 'noun_phrases', 'parse_tree', 'parse_list');
                    res.body[1].should.have.all.keys('text', 'len', 'tokens', 'noun_phrases', 'parse_tree', 'parse_list');
                    done();
                });
        });
        it('it should fail on missing input field', (done) => {
            let request = {
            };
            chai.request(server)
                .post('/')
                .send(request)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('it should fail on missing body', (done) => {
            chai.request(server)
                .post('/')
                .send("")
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('it return empty array on empty input', (done) => {
            let request = {
                input: ""
            };
            chai.request(server)
                .post('/')
                .send(request)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('array').that.has.lengthOf(0);
                    done();
                });
        });
    });
});
