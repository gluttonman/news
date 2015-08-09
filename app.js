/**
 *
 * Created by glutton on 2015/8/8.
 */
var express = require("express");
var fs = require("fs");
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
var app = express();
var async = require("async");
app.listen("8000");
app.use("/index",function(req, res, next){
    res.send("this is test");
});
var conttentResult="";
emitter.on("togetherData",function(content){
    conttentResult+=content;
    console.info(conttentResult);
});
emitter.on("error",function(error){
    console.info(error);
    conttentResult+=error;
});
app.use("/emitter",function(req, res, next){
    fs.readFile("test.txt","utf-8",function(err, content){
        try{
            emitter.emit("togetherData",content);
        }catch(e){
            emitter.emit("error", e);
        }
    });
    fs.readFile("text2.txt","utf-8",function(err,content){
        emitter.emit("togetherData",content);
        res.send(conttentResult);
        conttentResult="";
    });

});

app.use("/async",function(req, res, next){
    var contentResult = "";
    async.parallel([
        function(calllback){
            fs.readFile("test.txt","utf-8",function(err,content){
                calllback(null,content);
            });
        },function(callback){
            fs.readFile("text2.txt","utf-8",function(err, content){
                callback(null,content);
            });
        }
    ],function(err, results){
       results.forEach(function(item,i){
           console.info(i);
           console.info(item);
           contentResult+=item;

       });
        res.send(contentResult);
    });

});