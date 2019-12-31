var express=require("express");
var router=express.Router();
var account=require("../model/account");
router.post('/addemployer',function(req,res){
    console.log("/addemployer found!")
    console.log("req.body ........",req.body)
    account.insert(req.body,function(err,result){
        if(err){
            res.send(err)
        }
        if(result){
            res.send(result)
        }
    }); 
});
module.exports=router;