const express = require('express');
const router = express.Router();

router.get("/doubleClick", function(req, res){
    res.send("複製されたと思うが、複製機能は仮で実装しているため、本実装では別のところから呼び出す");
})

module.exports = router;
