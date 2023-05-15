const exp = require("constants");
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

//テンプレートエンジン(ejs)を使ってファイルを分ける
//バージョンは3.1.9。package.jsonに書いてある
//app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("index.ejs");
});

app.listen(port, function(req, res){
    console.log("listening");
})
