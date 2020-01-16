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
            res.status(200).json({status:1,err:result.ops})
        }
    })
})
router.post('/view_applicants',function(req,res){
    var id=req.body.id;
    applicants.findWhere({job_id:id},function(err,result){
        var data=result;
        if(err){
            console.log("Error!!!")
            res.status(400).json({status:0,err:"err"})
        }
        if(data.length==0){
            console.log("No one applied for this job")
            res.status(400).json({status:0,result:"No one applied for this job"})
        }
        else{
            console.log("Successful.....",data)
            data.forEach(element => {
                global.array=[];
                //console.log("jobseeker",element.jobseeker_id)
                jobseeker_account.findWhere({_id : Mongodb.ObjectId(element.jobseeker_id)},function(err,result1){
                    if(err){
                        console.log("error")
                        res.status(400).json({status:0,result:"Error"})
                    }
                    if(result1){
                        var data1=result1
                        console.log("successful")
                        array.push(data1)
                         global.array1 = [];
                          array1 = [].concat(array)  
                        console.log("array1....",array1)
                    }
                })
            });
        }
            res.status(200).json({status:1,result:array1})
            console.log("array....",array1)
    })
})
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