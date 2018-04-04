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
    (async () => {
        let feed = await parser.parseURL('https://www.mbl.is/feeds/200milur/');
        res.json(feed.items);
      })();
});

router.get('/feed/fiskifrettir', function(req, res, next) {
    (async () => {
        let feed = await parser.parseURL('http://www.fiskifrettir.is/rss/');
        res.json(feed.items);
      })();
});

router.get('/feed/kvotinn', function(req, res, next) {
    (async () => {
        let feed = await parser.parseURL('https://kvotinn.is/feed/');
        res.json(feed.items);
      })();
});


router.get('/feed/:source', function(req, res, next) {
    var source = req.params.source;
    query = {"source": req.params.source};
    (async () => {
        let feed = await parser.parseURL(source);
        res.json(feed.items);
      })();
    /*
    req.mongoDb.collection("news").find(query).toArray(function(err,results){
        res.json(results);
    });
    */
});





module.exports = router;
