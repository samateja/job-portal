var fs = require('fs');
var config = require('../bin/config.json');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
process.env.NODE_PORT = 3001;
const app = require("../app.js").app;
let server = 'http://localhost:'+process.env.NODE_PORT

let should = chai.should();
chai.use(chaiHttp);


//Our parent block
describe('Search', () => {
  let pollId;
  /* Test the /search route
  */
    
    after(function(done){
        if(pollId){
            fs.unlink (config.searchResultsDir + '/' +pollId+ '.json', function(err) {
                if (err) throw err;
              // app.close();         
                done();
            });
        }else{
            done();
        }
    })
    describe('/GET search jobs', () => {
        it('it should GET the jobs', (done) => {
            chai.request(server)
                .get('/search?description=node')
                .end((err, res) => {                 
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('pollId');
                    pollId = res.body.pollId;
                    res.body.should.have.property('message');
                    res.body.message.should.equal
                    (`Request is being processed and results will be available shortly.`);                  
                done();
                });
        });
    });
});