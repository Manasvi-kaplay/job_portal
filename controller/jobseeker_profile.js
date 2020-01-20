var express=require("express");
var router=express.Router();
var jobseeker_account=require("../model/jobseeker_account");
var Mongodb=require("mongodb");
router.post('/view_profile',function(req,res){
    var id=req.body.id;
    console.log("req.query....",req.query)
    console.log("req.params....",req.params)
    jobseeker_account.findWhere({ _id : Mongodb.ObjectId(id) }, function(err, result){
      if(err){
        console.log("Error",err)
        res.status(400).json({status:0,result:"error"})
      }
      var prodata=result[0];
           console.log("profile...",prodata);
           res.status(200).json({status:1,result:prodata})
          })
    });
module.exports=router;