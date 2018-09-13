var db = require('../common/basicConnection');
var $sqlCommands = require('../common/sqlCommand');
var com = require('../common/common')

function add(req, res, next){
    var sb = req.body
    db.queryArgs($sqlCommands.wuliu.insertOne,
        [sb.tempId,sb.sweight,sb.sprice,sb.xweight,sb.xprice,sb.province,sb.tempname],
        function (err, body) {
            if (!err) {
                db.doReturn(res, { data: body.insertId,msg:'插入成功', code: true });
            } else {
                db.doReturn(res,  { code: false,  msg: '插入失败'  });
            }
        }
    );
}
function update(req, res, next) {
    var str = 'update wuliu set ';
    req.body.tempId ? str+='tempId="'+req.body.tempId+'",':'';
    req.body.tempname ? str+='tempname="'+req.body.tempname+'",':'';
    req.body.sweight ? str+='sweight="'+req.body.sweight+'",':'';
    req.body.sprice ? str+='sprice="'+req.body.sprice+'",':'';
    req.body.xweight ? str+='xweight="'+req.body.xweight+'",':'';
    req.body.xprice ? str+='xprice="'+req.body.xprice+'",':'';
    req.body.province ? str+='province="'+req.body.province+'",':'';    
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
    db.queryPage("wuliu",req.body.wheres,req.body.orderby,req.body.page,req.body.size,function(err,body){
        var data = body
        db.doReturn(res, body);
    })
}
function findById(req, res, next){
    db.queryPage("wuliu",' id='+req.query.id,'','','',function(err,body){
        var data = body
        db.doReturn(res, body);
    })
}
module.exports = {
    add:add,
    findById:findById,
    finds:finds,
    update:update
};