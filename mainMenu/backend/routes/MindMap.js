const express = require('express');
const dbController = require('../database/controllers');
const router = express.Router();

//送信されたデータを受け取る。
router.post("/doubleClick", function(req, res){
    //req.body.フロントエンド側で送ったデータ名で、中身を取り出せる！
    console.log(req.params, req.body);
    dbController.findOne(req, res);
})

router.get("/all", function(req, res){
    console.log(req.params, req.body);
    dbController.findAllData(req, res);
})

module.exports = router;
