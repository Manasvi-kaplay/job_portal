var express=require("express");
var router=express.Router();
var applications=require("../model/applications")
var applicants=require("../model/applicants")
var jobseeker_account=require("../model/jobseeker_account")
var Mongodb=require("mongodb");
router.post('/apply',function(req,res){
    applicants.insert(req.body,function(err,result){
        if(err){
            res.status(400).json({status:0,err:"err"})
        }
        if(result){
            res.status(200).json({status:1,result:result.ops})
        }
    })
})
router.post('/view_applicants',function(req,res){
    var id=req.body.id;
    applicants.findWhere({job_id:id},function(err,result){
        if(err){
            res.status(400).json({status:0,err:"error"})
        }
        if(result){
            var data=result;
            console.log("result.....",data)
            res.status(200).json({status:1,result:data})
        }
    })
});
router.post('/addapplication',function(req,res)
{
    console.log("req.body ........",req.body)
    applications.insert(req.body,function(err,result)
    {
        if(err){
            res.status(400).json({status:0,err:"err"})
        }
        if(result){
            res.status(200).json({status:1,err:result.ops})
        }
    });
});
module.exports=router;