/**
 * Created by Administrator on 2015/7/21 0021.
 */
var express = require("express");
var router = express.Router();
router.get('/', function (req, res, next) {
    res.render('login', {});
});

module.exports = router;