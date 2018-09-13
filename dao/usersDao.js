var db = require('../common/basicConnection');
var $sqlCommands = require('../common/sqlCommand');
var com = require('../common/common')
var http = require('request');

function login(req, res, next) {
    // 获取前台页面传过来的参数
    var params = req.body;
    http.get('https://api.weixin.qq.com/sns/jscode2session?appid=' + com.APPID + '&secret=' + com.APP_SCREPT + '&js_code=' + req.body['code'] + '&grant_type=authorization_code', function (error, response, body) {
        var wxs = JSON.parse(body);
        findByOpenid(wxs.openid,function(err,body){
            if (body.length != 0) {
                db.doReturn(res, { data: body, code: true });
            } else {
                db.queryArgs($sqlCommands.users.insertOne,
                    [wxs.openid],
                    function (err, body) {
                        if (!err) {
                            findByOpenid(wxs.openid,function(err,body){
                                db.doReturn(res, { data: body,msg:'插入成功', code: true });
                            })
                        } else {
                            db.doReturn(res,  { code: false,  msg: '插入失败'  });
                        }
                        
                    }
                );
            }
        })
    })
}

function findByOpenid(openid,cb){
    db.queryArgs($sqlCommands.select('users',' where openid="'+openid+'"'),function(err, body){
        cb(err,body)
    })
}

function update(req, res, next) {
    var str = 'update users set ';
    req.body.nickName ? str+='nick_name="'+req.body.nickName+'",':'';
    req.body.avatarUrl ? str+='avatar_url="'+req.body.avatarUrl+'",':'';
    req.body.phone ? str+='phone="'+req.body.phone+'",':'';
    req.body.province ? str+='province="'+req.body.province+'",':'';
    req.body.city ? str+='city="'+req.body.city+'",':'';
    req.body.gender ? str+='gender="'+req.body.gender+'",':'';
    req.body.isdelete ? str+='isdelete="'+req.body.isdelete+'",':'';
    str = str.substring(0,str.length-1);
    str += ' where id in ('+req.body.ids+')';
    db.queryArgs(str,[],
        function (err, body) {
            db.doReturn(res, { data: body,msg:'更新成功', code: true });
        }
    );
}

/**
 * 
 * @param {wheres} 查询条件 
 * @param {orderby} 查询约束 
 * @param {page} 页码 
 * @param {size} 条数
 */
function finds(req, res, next){
    db.queryPage("users",req.body.wheres,req.body.orderby,req.body.page,req.body.size,function(err,body){
        var data = body
        db.doReturn(res, body);
    })
}

module.exports = {
    findByOpenid:findByOpenid,
    login: login,
    finds:finds,
    update:update
};