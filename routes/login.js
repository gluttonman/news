/**
 * Created by Administrator on 2015/7/21 0021.
 */
var express = require("express");
var mysql = require("mysql");
var data;
var connection = mysql.createConnection({
    host:"192.168.0.3",
    user:"root",
    password:"thinkpad",
    database:"zcms2216451",
    port:"3306"
});
connection.connect();
connection.query("select id,title,logofile from zccontent order by addtime desc limit 10",function(err,row,fields){
   data=row;
});
connection.end();

var router = express.Router();
router.get('/', function (req, res, next) {
    console.info(data[0]);
    res.render('login', {articles:data});
});

module.exports = router;