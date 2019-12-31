var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var session=require("express-session");
var cookieParser=require("cookie-parser");
app.use(bodyParser.urlencoded({
  extended:false
}));
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json()); 
app.use(cookieParser());
app.use(session({ secret : "TSS", saveUninitialized: true}));
app.use(require("./controller/default"));
/*app.get("/test",function(req,res){
  function(err,result){
    if(err){
      res.status(400).json({status:0,err:"err"})
    }
    if(result){
      res.status(200).json({status:1,result:result});
    }
  }
})*/
app.listen(process.env.PORT || 3000,function(){
    console.log("server started at port 3000")
});
