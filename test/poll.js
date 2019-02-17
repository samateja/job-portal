var fs = require('fs');
var config = require('../bin/config.json');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
process.env.NODE_PORT = 3001;
const app = require("../app.js").app;
let server = 'http://localhost:'+process.env.NODE_PORT

chai.use(chaiHttp);

//Our parent block
describe('poll', () => {
    let wrong_pollId = 'searchjob_wrong';
    let correct_pollId = 'searchjob';
    let done_pollId = 'searchjob_done';

    
  /* Test the /search route
  */
    before(function(done){            
        fs.writeFile (config.searchResultsDir + '/' +correct_pollId+ '.json', JSON.stringify({done: false}), function(err) {
            if (err) throw err;           
        });

        fs.writeFile (config.searchResultsDir + '/' +done_pollId+ '.json', JSON.stringify({done: true, data: []}), function(err) {
            if (err) throw err;           
            done();
        });
    }) 


    after(function(done){        
        fs.unlink (config.searchResultsDir + '/' +correct_pollId+ '.json', function(err) {
            if (err) throw err;           
            done();
        });
    })

    describe('/GET poll searched jobs', () => {
        
        it('it should return done:false', (done) => {        
            
            chai.request(server)
            .get('/poll/'+wrong_pollId)
            .end((err, res) => {                            
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');                
                    res.body.should.have.property('message').equal('Unknown pollId');                
                done();
            });    
        });

        it('it should return unknown pollId', (done) => {        
            
            chai.request(server)
            .get('/poll/'+correct_pollId)
            .end((err, res) => {                   
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('done');                
                    res.body.should.have.property('done').equal(false);                
                done();
            });
        });

        it('it should return done true with data', (done) => {        
            
            chai.request(server)
            .get('/poll/'+done_pollId)
            .end((err, res) => {                    
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('done');
                    res.body.should.have.property('data');                
                    res.body.should.have.property('done').equal(true);
                    res.body.should.have.property('data').be.a('array');            
                done();
            });
        });
    });
});