var db = require('../common/basicConnection');
var $sqlCommands = require('../common/sqlCommand');
var com = require('../common/common')

function add(req, res, next){
    var sbody = req.body;
    db.queryArgs($sqlCommands.hot.insertOne,
        [sbody.goodsId,sbody.sort,sbody.type],
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
    var str = 'update hot set ';
    req.body.goodsId ? str+='goodsId="'+req.body.goodsId+'",':'';
    req.body.sort ? str+='sort="'+req.body.sort+'",':'';
    req.body.type ? str+='type="'+req.body.type+'",':'';
    req.body.isdelete ? str+='isdelete="'+req.body.isdelete+'",':'';
    str = str.substring(0,str.length-1);
    str += ' where id in ('+req.body.ids+')';
    db.queryArgs(str,
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
    db.queryPage("hot",req.body.wheres,req.body.orderby,req.body.page,req.body.size,function(err,body){
        var data = body
        db.doReturn(res, body);
    })
}
function findById(req, res, next){
    db.queryPage("hot",' id='+req.query.id,'','','',function(err,body){
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