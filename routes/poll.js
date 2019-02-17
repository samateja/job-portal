var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../bin/config.json');
var fs = require('fs');

router.get('/:pollId', function (req, res) {
   
    let filename = req.params.pollId;

    //Read the polled json and delete on success.
    fs.readFile( './' + config.searchResultsDir + '/' + filename+'.json', (err, rawdata) => {
        
        if(err && err.code === 'ENOENT'){
            return res.json({message: "Unknown pollId"});
        }

        let data = [];
        if(rawdata && Object.keys(rawdata).length > 0) {
            data = JSON.parse(rawdata);
        }
        res.send(data);
        
        if(data.done){
            fs.unlink('./' + config.searchResultsDir + '/' +filename+'.json', (err)=> {
                if(err)
                console.dir(err)
            });
        }
    });
   
  })

module.exports = router;
