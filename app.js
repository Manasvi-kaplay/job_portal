var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var session=require("express-session");
var cookieParser=require("cookie-parser");
var fileupload=require("express-fileupload");
var fs=require("fs");
app.use(bodyParser.urlencoded({
  extended:false
}));
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json()); 
app.use(cookieParser());
app.use(session({ secret : "TSS", saveUninitialized: true}));
app.use(fileupload());
app.use(require("./controller/default"));
app.listen(process.env.PORT || 3000,function(){
    console.log("server started at port 3000")
});
