var express = require('express');
var path = require('path');

var app = express();
var __dirname = './Public';

app.use(express.static(path.join(__dirname)));

app.get('/',function(req,res){
  res.sendFile('/Views/index.html' , { root : __dirname});
});

app.listen(8000);
console.log("App listening on port 8000");
