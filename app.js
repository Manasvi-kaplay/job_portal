var express=require("express");
var app=express();
var bodyParser=require("body-parser");
//var urlencodedParser = bodyParser.urlencoded({limit: '50mb'});
var session=require("express-session");
var cookieParser=require("cookie-parser");
var fileupload=require("express-fileupload");
var fs=require("fs");

// app.use(bodyParser());
app.use(bodyParser.urlencoded({
  extended:false,
  limit:'50mb'
}));
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(express.static(__dirname+"/public"));
// app.use(bodyParser.json());  
app.use(cookieParser());
app.use(session({ secret : "TSS", saveUninitialized: true}));
app.use(fileupload());
app.get("/",function(err,result){
  result.send("success")
})
app.use(require("./controller/default"));
app.listen(process.env.PORT || 3000,function(){
  console.log(Math.floor(Math.random() * (99999 - 10000) + 10000))
    console.log("server started at port 3000")
});
