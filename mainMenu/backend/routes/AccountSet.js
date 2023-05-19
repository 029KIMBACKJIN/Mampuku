const express = require('express');
const router = express.Router();

router.get("/account", function(req, res){
    res.send("アカウントボタン。機能はまだない");
})

router.get("/logOut", function(req, res){
    res.send("ログアウトボタン。機能はまだない");
})

module.exports = router;