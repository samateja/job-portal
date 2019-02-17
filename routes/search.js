var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var config = require('../bin/config.json');
var uuidv1 = require('uuid/v1');
var url = require('url');

router.get('/', function (req, res) {
   
  let pollId = uuidv1();
  res.send({message: `Request is being processed and results will be available shortly.`,
            pollId: pollId});  
  
  fs.writeFile ('./' + config.searchResultsDir + '/' +pollId+ '.json', JSON.stringify({done: false}), function(err) {
    if (err) throw err;
      console.dir('complete');
    }
  );

  var q = url.parse(req.originalUrl, true); 
  let searchPath = config.searchUrl + q.search;
   
  request(searchPath, (error, response, body) => {
      if(error) {        
          return console.dir(error);
      }
          
      let searchBody =  {done : true,
                         data : JSON.parse((body && Object.keys.length > 0) ? body : '[]')};
      //res.send(JSON.parse(body));
      fs.writeFile ('./' + config.searchResultsDir + '/' +pollId+ '.json', JSON.stringify(searchBody), function(err) {
        if (err) throw err;
        console.dir('complete');
        }
      );
  });
})

module.exports = router;
