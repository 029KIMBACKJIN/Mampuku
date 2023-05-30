const  app = require("./app");
const port = 3000;


app.get("/", function(req, res){
    res.sendFile(__dirname + '/public/index.html')
});

app.listen(port, function(){
    console.log("port:" + port + " listening");
})