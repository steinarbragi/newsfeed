var express = require('express');
var mongodb = require('mongodb');
const {ObjectId} = require('mongodb');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwks = require('jwks-rsa');
var router = express.Router();
let Parser = require('rss-parser');
let parser = new Parser();


router.get('/feed/mbl', function(req, res, next) {
    //console.log('yo');
    //res.json({'yo':'yo'})
    (async () => {
 
        let feed = await parser.parseURL('https://www.mbl.is/feeds/200milur/');
        console.log(feed.title);
        
        res.json(feed.items);
        /*
        feed.items.forEach(item => {
          console.log(item.title + ':' + item.link)
        });*/
       
      })();
});


router.get('/feed/:source', function(req, res, next) {
    query = {"source": req.params.source};
    req.mongoDb.collection("news").find(query).toArray(function(err,results){
        res.json(results);
    });
});





module.exports = router;
