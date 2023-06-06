const express = require('express');
const dbController = require('../database/controllers');
const router = express.Router();

router.post("/update", function(req, res){
    console.log(req.body.id);
    dbController.update(req, res);
});

router.post("/delete", function(req, res){
    console.log(req.body.id);
    dbController.delete(req, res);
});

router.post("/all", function(req, res){
    console.log(req.params, req.body);
    //dbController.findAllData(req, res);
    dbController.findWithIdAll(req,res);
});

router.post("/findParent", function(req, res){
    dbController.findOne(req, res);
});

module.exports = router;