var express=require("express");
var router=express.Router();
var jobs=require("../model/jobs");
var employer_account=require("../model/employer_account");
var Mongodb = require('mongodb');
router.get('/view',function(req,res){
    jobs.find(function(err,result){
        var count=jobs.count();
        console.log("No. of documents in collection jobs...",count)
        for(var i=0;i<=count-1;i+=1){
        var data=result[i];
        console.log("jobs posted...",data);
        console.log("employer id....",data.employer_id);
        var id=data.employer_id;
            employer_account.findWhere({_id:Mongodb.ObjectID(id)},function(err,result){
                var prodata=result[i];
                var final={"id":prodata._id,
                           "name":prodata.name,
                           "address":prodata.address,
                           "phoneNo":prodata.phno,
                           "mobile":prodata.mobile,
                           "emailId":prodata.email}
                console.log("posted by....",prodata)
                res.status(200).json({status:1,result:{data,final}})
            })
        }
      })
})
router.post('/addjob',function(req,res)
{
    console.log("req.body ........",req.body)
    jobs.insert(req.body,function(err,result)
    {
        if(err){
            res.status(400).json({status:0,err:"err"})
        }
        if(result){
            res.status(200).json({status:1,err:result.ops})
        }
    });
});
router.post('/edit',function(req,res){
    console.log("req.body.....",req.body)
  console.log(req.body.id)
    jobs.update({ _id : Mongodb.ObjectId(req.body.id) },req.body,function(err,result){
        if(err){
            res.status(400).json({status:0,err:"err"})
        }
        if(result){
            res.status(200).json({status:1,err:result.ops})
        }
    })
})
router.post('/delete',function(req,res){
    console.log("req.body......",req.body)
    console.log(req.body.id)
      jobs.delete({_id:Mongodb.ObjectId(req.body.id)},function(err,result){
          if(err){
              res.status(400).json({status:0,err:"Job could not be deleted!"})
          }
          if(result){
              res.status(200).json({status:1,err:"Job deleted"})
          }
      })
})  
module.exports=router;