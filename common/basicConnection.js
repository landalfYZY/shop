var mysql = require('mysql');
var $dbConfig = require('../config/database');

// 使用连接池，避免开太多的线程，提升性能
var pool = mysql.createPool($dbConfig.mysql);

/**
 * 对query执行的结果自定义返回JSON结果
 */
function repReturn(res, result,resultJSON) {
    if(typeof result === 'undefined') {
        res.json({
            code:'201',
            msg: 'failed to do'
        });
    } else {
        res.json(result);
    }
};



/**
 * 封装query之sql带不占位符func
 */
function query(sql, callback) {
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, rows) {
            callback(err, rows);
            //释放链接
            connection.release();
        });
    });
}

/**
 * 封装query之sql带占位符func
 */
function queryArgs(sql,args, callback) {
    pool.getConnection(function (err, connection) {
        connection.query(sql, args,function (err, rows) {
            callback(err, rows);
            //释放链接
            connection.release();
        });
    });
}

//分页查询
function queryPage(tablename,wheres,orderby,page,size,callback){
    var str = 'select * from '+tablename+' where '+wheres;
    if(orderby != ''){
        str+=' order by '+orderby
    }
    if(page != ''){
        str+=' limit '+(page-1)+','+size
    }
    pool.getConnection(function(err,connection){
        connection.query(str, [],function (err, rows) {
            connection.release();
            queryArgs('SELECT COUNT(id) FROM '+tablename,function(err,body){
                callback(err,  { data: {data:rows,total:body[0]['COUNT(id)']}, code: true });
            })         
        });
    }) 
}

//exports
module.exports = {
    query: query,
    queryArgs: queryArgs,
    doReturn: repReturn,
    queryPage:queryPage
}