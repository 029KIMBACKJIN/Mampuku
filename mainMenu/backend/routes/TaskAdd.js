const express = require('express');
const dbController = require('../database/controllers');
const router = express.Router();

//「/TaskAdd/..」
router.post("/create", function(req, res){
    console.log(req.body);
    //データベースに登録

    //dbController.findWithIdAll(req, res);
    //console.log("req.body");

    dbController.create(req, res);
});

router.post("/all", function(req, res){
    console.log(req.params, req.body);
    //dbController.findAllData(req, res);
    dbController.findWithIdAll(req,res);
});

router.post("/findParent", function(req, res){
    dbController.findOne(req, res);
});

router.post("/retrieve", function(req, res) {
    //console.log(req.body);
    dbController.findOne(req, res);

});

module.exports = router;

