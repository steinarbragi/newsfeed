var express = require('express');
var mongodb = require('mongodb');
const {ObjectId} = require('mongodb');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwks = require('jwks-rsa');
var router = express.Router();
let Parser = require('rss-parser');
let parser = new Parser();


router.get('/mbl', function(req, res, next) {
    //console.log('yo');
    //res.json({'yo':'yo'})
    (async () => {
 
        let feed = await parser.parseURL('https://www.mbl.is/feeds/200milur/');
        console.log(feed.title);
        
        res.json(feed.title);
        /*
        feed.items.forEach(item => {
          console.log(item.title + ':' + item.link)
        });*/
       
      })();
});



module.exports = router;
