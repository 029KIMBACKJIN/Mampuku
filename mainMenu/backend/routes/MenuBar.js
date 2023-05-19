var express = require('express');
var router = express.Router();

//「/MenuBar/で始まるURLたち」
/* GET home page. */
//「使い方」ボタンを押したときに呼ばれる
router.get("/howTo", function(req, res){
  res.send("まだ作っていません。");
});

router.get("/criticalPass", function(req, res){
  res.send("タスクで遅れてはいけない箇所を強調表示させる予定");
})

router.get("/other", function(req, res){
  res.send("仮のボタン。時間が余ったら追加していく。");
})

module.exports = router;
