var express=require("express");
var router=express.Router();
var jobseeker_account=require("../model/jobseeker_account");
var Mongodb=require("mongodb");
var resume=require("../model/resume");
router.post('/view_profile',function(req,res){
    var id=req.body.id;
    console.log("req.query....",req.query)
    console.log("req.params....",req.params)
    jobseeker_account.findWhere({ _id : Mongodb.ObjectId(id) }, function(err, result){
      var prodata=result[0];
           console.log("profile...",prodata);
      resume.findWhere({jobseeker_id:id},function(err,result){
            var data=result[0];
            console.log("resume...",data);
            if(data){
              res.status(200).json({status:1,result:{prodata,data}})
            }
              else{
                res.status(200).json({status:"No resume created!",result:prodata})
              }
          })
    });
})
module.exports=router;