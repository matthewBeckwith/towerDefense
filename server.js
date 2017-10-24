var express = require('express');

var app = express();

app.use(express.static('/Public'));
var __dirname = './Public'

app.get('/',function(req,res){
  res.sendFile('/Views/index.html' , { root : __dirname});
});

app.listen(8000);
console.log("App listening on port 8000");
