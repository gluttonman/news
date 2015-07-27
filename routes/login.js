/**
 * Created by Administrator on 2015/7/21 0021.
 */
var express = require("express");
var dbManager = require("../mymodules/dbmodule/DBManager").DBManager;
var article_data;
var route_data;
dbManager.select("select t.id,t.title,t.logofile,t.staticFileName,t.linkflag,t.redirecturl,l.path from zccontent t inner join zccatalog l on t.catalogid=l.id order by t.addtime desc limit 3",function(rows){
    article_data = rows;
    console.info(rows);
});
dbManager.select("select id,title from zccontent where status=30 and catalogid=126 ",function(rows){
    route_data = rows;
});

var router = express.Router();
router.get('/', function (req, res, next) {

    res.render('login', {articles:article_data,routes:route_data});
});

module.exports = router;