var express = require('express');
var router = express.Router();
var usersDao = require('../dao/usersDao')
/* GET users listing. */



router.post('/login',function(req,res,next){
  usersDao.login(req,res,next)
});
router.post('/finds',function(req,res,next){
  usersDao.finds(req,res,next)
})
router.post('/update',function(req,res,next){
  usersDao.update(req,res,next)
})
module.exports = router;