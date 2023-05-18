const express = require("express");
const app = express();
const port = 3000;

app.get("/", function(req, res){
    //なし
    res.send("ようこそ")
});

//「使い方」ボタンを押したときに呼ばれる
app.get("/MenuBar/howTo", function(req, res){
    res.send("まだ作っていません。");
});

app.get("/MenuBar/criticalPass", function(req, res){
    res.send("タスクで遅れてはいけない箇所を強調表示させる予定");
})

app.get("/MenuBar/other", function(req, res){
    res.send("仮のボタン。時間が余ったら追加していく。");
})

app.get("/MindMap/doubleClick", function(req, res){
    res.send("複製されたと思うが、複製機能は仮で実装しているため、本実装では別のところから呼び出す");
})

app.get("/AccountSet/account", function(req, res){
    res.send("アカウントボタン。機能はまだない");
})

app.get("/AccountSet/logOut", function(req, res){
    res.send("ログアウトボタン。機能はまだない");
})

app.listen(port, function(){
    console.log("port:" + port + " listening");
})