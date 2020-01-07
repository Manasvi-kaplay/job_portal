var express=require("express");
var router=express.Router();
var jobs=require("../model/jobs");
var employer_account=require("../model/employer_account");
var Mongodb = require('mongodb');
router.get("/update/:id", function(req, res){
	console.log(req.query);
	console.log(req.params);
	var id = req.params.id;
	jobs.findWhere({ _id : Mongodb.ObjectId(req.params.id) }, function(err, result){
		var prodata=result[0];
         console.log(prodata);
         res.status(200).json({status:1,err:prodata})
	});
});
router.get("/view/:email",function(req,res){
    var email = req.params.email;
  employer_account.findWhere({ email }, (err, result) => {
    if (err || !result) {
      //res.render('public-profile', { messages: { error: ['User not found'] } });
      res.status(400).json({status:0,err:"error"})
    }
    res.status(200).json({status:1,err:result})
    //res.render('public-profile', { ...results, username });
    console.log("result......",result)
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
    employer_account.insert(req.body._id,function(err,result){
        if(err){
            res.status(400).json({status:0,err:"id could not be inserted"})
        }
        if(result){
            res.status(200).json({status:1,err:"id inserted"})
        }
    });
});
router.post('/edit',function(req,res){
    console.log(req.body,"DDDDDDDDDDDDDDDDDDDD")
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
    console.log(req.body,"DDDDDDDDDDDDDDDDDDDD")
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