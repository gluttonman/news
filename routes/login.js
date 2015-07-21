/**
 * Created by Administrator on 2015/7/21 0021.
 */
var express = require("express");
var mysql = require("mysql");
var article_data;
var route_data;
var connection = mysql.createConnection({
    host:"192.168.0.3",
    user:"root",
    password:"thinkpad",
    database:"zcms2216451",
    port:"3306"
});
connection.connect();
connection.query("select id,title,logofile from zccontent order by addtime desc limit 3",function(err,row,fields){
    article_data=row;
});
connection.query("select id,title from zccontent where status=30 and catalogid=126 ",function(err,row,fields){
    route_data=row;
});
connection.end();

var router = express.Router();
router.get('/', function (req, res, next) {

    res.render('login', {articles:article_data,routes:route_data});
});

module.exports = router;