var express = require('express');
var router = express.Router();
var dao = require('../dao/addressDao')

/* GET home page. */
router.post('/add',function(req,res,next){
    dao.add(req,res,next)
  });
  router.post('/finds',function(req,res,next){
    dao.finds(req,res,next)
  })
  router.post('/update',function(req,res,next){
    dao.update(req,res,next)
  })
  router.get('/findById',function(req,res,next){
    dao.findById(req,res,next)
  })
module.exports = router;