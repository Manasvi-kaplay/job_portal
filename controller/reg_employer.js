var express=require("express");
var router=express.Router();
var account=require("../model/account");
router.post('/addemployer',function(req,res){
    console.log("/addemployer found!")
    console.log("req.body ........",req.body)
    account.insert(req.body,function(err,result){
        if(err){
            res.status(400).json({status:0,err:"err"})
        }
        if(result){
            res.status(200).json({status:1,err:result.ops})
        }
    }); 
});
module.exports=router;