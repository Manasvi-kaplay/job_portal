var express=require("express");
var router=express.Router();
var employer_account=require("../model/employer_account");
var Mongodb = require('mongodb');
router.get("/update/:id", function(req, res){
	console.log(req.query);
	console.log(req.params);
	var id = req.params.id;
	employer_account.findWhere({ _id : Mongodb.ObjectId(req.params.id) }, function(err, result){
		var prodata=result[0];
         console.log(prodata);
         res.status(200).json({status:1,err:prodata})
	});
});
router.post('/addemployer',function(req,res)
{
    console.log("req.body ........",req.body)
    var email=req.body.email;

    employer_account.findWhere({email:email},function(err,result)
    {
        console.log("result.length  :"+result.length)
        if(result.length==0){
            console.log("req.body....",req.body)
            req.body.status=0;
            //var obj={};
    employer_account.insert(req.body,function(err,result)
    {
        if(err){
            res.status(400).json({status:0,err:"err"})
        }
        if(result){
            res.status(200).json({status:1,err:result.ops})
        }
    });
                            }
        else{
        console.log("Entered email id already exists!!")
        res.status(400).json({status:0,err:"Entered email id already exists!!"})
        res.end("Entered email id already exists!!")
            }
    }); 
});
router.post('/edit',function(req,res){
    console.log(req.body,"DDDDDDDDDDDDDDDDDDDD")
  console.log(req.body.id)
    employer_account.update({ _id : Mongodb.ObjectId(req.body.id) },req.body,function(err,result){
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
      employer_account.delete({_id:Mongodb.ObjectId(req.body.id)},function(err,result){
          if(err){
              res.status(400).json({status:0,err:"Account could not be deleted!"})
          }
          if(result){
              res.status(200).json({status:1,err:"Account deleted"})
          }
      })
})
module.exports=router;