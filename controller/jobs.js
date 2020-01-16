var express=require("express");
var router=express.Router();
var jobs=require("../model/jobs");
var employer_account=require("../model/employer_account");
var Mongodb = require('mongodb');
var connection=require("../config/connect")
router.get('/view',function(req,res){
    jobs.find(function(err,result){
        var data=result;
        res.status(200).json({status:1,result:data})
      })
})
router.post('/view_job_details',function(req,res){
    var id=req.body.id;
    jobs.findWhere({_id:Mongodb.ObjectID(id)},function(err,result){
        if(err){
            console.log("Error!")
            res.status(400).json({status:0,err:"Error!"})
        }
        if(result){
            var data=result;
            console.log("success...",data)
            res.status(200).json({status:1,result:data})
        }
    })
})
router.post('/view_by_cat',function(req,res){
    connection.init(function(err,client){
        var category=req.body.category;
		console.log(client);
		var db=client.db('jobportal');
		db.collection("jobs").find({category:{
			$regex:new RegExp(category)
		},function(err,data){
            res.status(200).json({status:1,data:data})
        }
	})
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