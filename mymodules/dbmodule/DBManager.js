/**
 * Created by Administrator on 2015/7/23 0023.
 */
var mysql = require("mysql");
var pool = mysql.createPool({
    connectionLimit:10,
    host:'192.168.0.3',
    user:'root',
    password:'thinkpad',
    database:'zcms2216451'
})

var DBManager = {};
DBManager.select = function(sql,callBack){
    pool.getConnection(function(err,connection){
        var data = connection.query(sql,function(err,rows){
            if(err){
                connection.release();
                console.info(err);
                return;
            }
            connection.release();
            callBack.apply(null,[rows]);
        });
    });
}

module.exports.DBManager = DBManager;