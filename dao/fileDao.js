var multer = require('multer');
var db = require('../common/basicConnection');
var $sqlCommands = require('../common/sqlCommand');
var com = require('../common/common')

var uploadPath = process.cwd() + '/ddshopimg/uploads';

uploadPath = uploadPath.replace( /\\/g , '/' );
function S4() { 
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
 }; 
 // Generate a pseudo-GUID by concatenating random hexadecimal. 
 function guid() { 
    return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4()); 
 };
var storage = multer.diskStorage({ 
    destination: uploadPath,
    filename: function (req, file, cb) {
        cb(null, guid()+file.originalname.substring(file.originalname.lastIndexOf('.'),file.originalname.length))
    }
})
var multer = multer({
    storage: storage,
    //limits：''//Limits of the uploaded data
}).single('file');

function add(req, res, next){
    var sb = req.body;
    multer(req,res,function(err){
        if (err) throw err;

        db.queryArgs($sqlCommands.file.insertOne,
            [req.file.filename,req.file.originalname,req.file.size,req.file.mimetype,uploadPath+'/'],
            function (err, body) {
                if (!err) {
                    db.doReturn(res, { data: uploadPath+'/'+req.file.filename,msg:'插入成功', code: true });
                } else {
                    console.log(err)
                    db.doReturn(res,  { code: false,  msg: '插入失败'  });
                }
            }
        );
        
    })
    
}


/**
 * 
 * @param {wheres} 查询条件 
 * @param {orderby} 查询约束 
 * @param {page} 页码 
 * @param {size} 条数
 */
function finds(req, res, next){
    db.queryPage("wuliucompany",req.body.wheres,req.body.orderby,req.body.page,req.body.size,function(err,body){
        var data = body
        db.doReturn(res, body);
    })
}
function findById(req, res, next){
    db.queryPage("wuliucompany",' id='+req.query.id,'','','',function(err,body){
        var data = body
        db.doReturn(res, body);
    })
}
module.exports = {
    add:add,
    findById:findById,
    finds:finds
};