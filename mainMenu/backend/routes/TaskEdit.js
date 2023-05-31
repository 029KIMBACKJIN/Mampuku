const express = require('express');
const dbController = require('../database/controllers');
const app = express();

app.post("/update", function(req, res){
    console.log(req.body.id);
    dbController.update(req, res);
});

app.post("/delete", function(req, res){
    console.log(req.body.id);
    dbController.delete(req, res);
});

module.exports = app;