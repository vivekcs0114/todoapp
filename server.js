var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var path=require('path');
var morgan=require('morgan');
var mongoose=require('mongoose');
var confData=require('./dbConfig.js');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'accept');
    next();
});
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/', express.static(path.join(__dirname, '')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
mongoose.connect(confData.db);

app.get('/',function (req,res) {
    res.sendFile(__dirname+"/index.html");
});

app.listen(3001,function () {
    console.log("server in running on port : 3001");
});