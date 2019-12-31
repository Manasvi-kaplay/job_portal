var express=require("express");
var app=express();
// var ejs=require("ejs")
var bodyParser=require("body-parser");
var session=require("express-session");
var cookieParser=require("cookie-parser");
// app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended:false
}));
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json()); 
app.use(cookieParser());
app.use(session({ secret : "TSS", saveUninitialized: true}));
// app.use(require("./controller/default"));

app.get("/",function(req,res){
  res.send("success fully deploy")
})

app.get("/test",function(req,res){
  res.send("test")
})


app.listen(process.env.PORT || 3000,function(){
    console.log("server started at port 3000")
});
