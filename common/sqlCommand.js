

var users = {
    insertOne:'INSERT INTO USERS (OPENID) VALUE(?)',
}
var category = {
    insertOne:'INSERT INTO CATEGORY (NAME,DES,ICON,ISOPEN,SORT) VALUE(?,?,?,?,?)'
}
var goods = {
    insertOne:'INSERT INTO GOODS (IMAGES,TITLE,PRICE,DISCOUNT,CONTENTID,KUCUN,DES,ISSALE,ISDISCOUNT,CATEID,CANSHU,WEIGHT,COMPANYID) VALUE(?,?,?,?,?,?,?,?,?,?,?,?,?)'
}
var carts = {
    insertOne:'INSERT INTO CARTS (GOODSID,USERID,NUM) VALUE(?,?,?)'
}
var collections = {
    insertOne:'INSERT INTO COLLECTIONS (GOODSID,USERID) VALUE(?,?)'
}
var address = {
    insertOne:'INSERT INTO RADDRESS (USERID,NAME,PHONE,PROVINCE,CITY,COUNT,DETAIL,ISDL) VALUE(?,?,?,?,?,?,?,?)'
}

var wuliu = {
    insertOne:'INSERT INTO WULIU (tempId,sweight,sprice,xweight,xprice,province,tempname) VALUE(?,?,?,?,?,?,?)'
}
var wuliucompany = {
    insertOne:'INSERT INTO wuliucompany (tempname,des,address,name,phone) VALUE(?,?,?,?,?)'
}
var file ={
    insertOne:'INSERT INTO FILES (FILENAME,ORIGINNAME,SIZE,GESHI,PATH) VALUE(?,?,?,?,?)'
}
var richtext = {
    insertOne:'INSERT INTO RICHTEXT (contents,title,author) VALUE (?,?,?)'
}
var hot = {
    insertOne:'INSERT INTO HOT (goodsId,sort,type) VALUE (?,?,?)'
}
function select(tablename,wheres){
    var str = 'SELECT * FROM '+tablename;
    if(wheres){
        str += wheres
    }
    return str;
}

//exports
module.exports = {
    users: users,
    select: select,
    category:category,
    goods:goods,
    address:address,
    wuliu:wuliu,
    wuliucompany:wuliucompany,
    file:file,
    richtext:richtext,
    hot:hot
};
