var db = require('../common/basicConnection');
var $sqlCommands = require('../common/sqlCommand');
var com = require('../common/common')

function add(req, res, next){
    var sb = req.body
    db.queryArgs($sqlCommands.goods.insertOne,
        [sb.images,sb.title,sb.price,sb.discount,sb.contentId,sb.kucun,sb.des,sb.issale,sb.isdiscount,sb.cateId,sb.canshu,sb.weight,sb.companyId],
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
    var str = 'UPDATE GOODS SET ';
    req.body.images ? str+='images="'+req.body.images+'",':'';
    req.body.companyId ? str+='companyId="'+req.body.companyId+'",':'';
    req.body.title ? str+='title="'+req.body.title+'",':'';
    req.body.price ? str+='price="'+req.body.price+'",':'';
    req.body.discount ? str+='discount="'+req.body.discount+'",':'';
    req.body.contentId ? str+='contentId="'+req.body.contentId+'",':'';
    req.body.kucun ? str+='kucun="'+req.body.kucun+'",':'';
    req.body.des ? str+='des="'+req.body.des+'",':'';
    req.body.issale ? str+='issale="'+req.body.issale+'",':'';
    req.body.isdiscount ? str+='isdiscount="'+req.body.isdiscount+'",':'';
    req.body.cateId ? str+='cateId="'+req.body.cateId+'",':'';
    req.body.isdelete ? str+='isdelete="'+req.body.isdelete+'",':'';
    str = str.substring(0,str.length-1);
    str += ' where id in ('+req.body.ids+')';
    console.log(str)
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
    db.queryPage("goods",req.body.wheres,req.body.orderby,req.body.page,req.body.size,function(err,body){
        db.doReturn(res, body);
    })
}
function findById(req, res, next){
    db.queryPage("goods",' id='+req.query.id,'','','',function(err,body){
        db.doReturn(res, body);
    })
}

function relfind(req,res,next){
    
    db.selfDo('goods',$sqlCommands.goods.select,req.body.orderby,req.body.page,req.body.size,function(err,body){
        db.doReturn(res, body);
    })
}
module.exports = {
    add:add,
    findById:findById,
    finds:finds,
    update:update,
    relfind:relfind
};