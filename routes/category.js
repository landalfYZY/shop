var express = require('express');
var router = express.Router();
var categoryDao = require('../dao/categoryDao')

/* GET home page. */
router.post('/add',function(req,res,next){
    categoryDao.add(req,res,next)
  });
  router.post('/finds',function(req,res,next){
    categoryDao.finds(req,res,next)
  })
  router.post('/update',function(req,res,next){
    categoryDao.update(req,res,next)
  })
  router.get('/findById',function(req,res,next){
    categoryDao.findById(req,res,next)
  })
module.exports = router;