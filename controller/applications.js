var express=require("express");
var router=express.Router();
var applicants=require("../model/applicants")
var jobseeker_account=require("../model/jobseeker_account")
var Mongodb=require("mongodb");
var jobs=require("../model/jobs")
router.post('/apply',function(req,res){
    jobseeker_account.update({ _id : Mongodb.ObjectId(req.body.id) },req.body,function(error,result){
        applicants.insert(req.body,function(err,result1){
            if(error){
            res.status(400).json({status:0,err:"error in updating record in jobseeker_account collection"})
            }
            if(err){
                res.status(400).json({status:0,err:"error in inserting record in applicants collection"})
            }
            if(result){
                res.status(200).json({status:1,result:"successful update",result1:result1.ops})
            }
        })
    });
})
router.post('/view_applicants',function(req,res){
    var id=req.body.id;
    applicants.findWhere({job_id:id},function(err,result){
        if(err){
            res.status(400).json({status:0,err:"error"})
        }
        if(result){
            var data=result;
            var totalApplicants=data.length;
            console.log("result....."+data+"no. of applicants......"+totalApplicants)
            res.status(200).json({status:1,result:data,totalApplicants:totalApplicants})
        }
    })
});
router.post('/view_applications',function(req,res){
  var id=req.body.id;
  jobseeker_account.findWhere({_id:Mongodb.ObjectID(id)},function(err,result){
      if(err){
        res.status(400).json({status:0,err:"error"})
      }
      if(result){
          var i=0;
          var j=0;
          while(i<result.length){
            console.log("job id...............",result[i].job_id)          
              while(j<result[i].job_id.length){
          jobs.findWhere({_id:Mongodb.ObjectID(result[i].job_id[j])},function(err,result1){
            if(j==result1.length-1){
                console.log("List of jobs.......",result1)
            res.status(200).json({status:1,result:result1})
            }
          })
          console.log("job id....",result[i].job_id[j])
          j+=1
        }
          i+=1
        }
        }
  })  
})
module.exports=router;