const express = require('express');
const dbController = require('../database/controllers');
const app = express();

//「/TaskAdd/..」
app.post("/create", function(req, res){
    console.log(req.body);
    //データベースに登録
    dbController.create(req, res);
});

app.post("/retrieve", function(req, res) {
    //console.log(req.body);
    dbController.findOne(req, res);
});

module.exports = app;

