const express = require('express');
const app = express(); // express 라이브러리 사용법

app.listen(8080, function() {
    console.log('listening on 8080')
}); // 서버를 여는 함수(서버 띄울 포트 번호, 띄운 후 실행할 코드)

app.get('/hello', function(req, res){
    res.send('hello.')
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
}); // 홈페이지