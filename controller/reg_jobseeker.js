var express=require("express");
var router=express.Router();
var changename = require("../helper/changefilename");
var fs = require('fs');
var path = require('path');
var jobseeker_account=require("../model/jobseeker_account");
var Mongodb = require('mongodb');
router.post('/addjobseeker',function(req,res){
    console.log("SSSSSSSSSSSanjay")
    console.log("req.body ........",req.body);
    if(req.files){
    var file = req.files.resume;
    console.log("file.....",file);
	var newname = changename(file.name);
	var filepath = path.resolve("public/jobseeker_resume/"+newname);
	file.mv(filepath, function(err){
		if(err){
			console.log(err);
			return;
		}
        req.body.resume=newname;
    });
}   
        var email=req.body.email;
    jobseeker_account.findWhere({email:email},function(err,result)
    {
        console.log("result.length  :"+result.length)
        if(result.length==0){
    jobseeker_account.insert(req.body,function(err,result){
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
router.post('/edit/:id',function(req,res){
        var id = req.params.id;
        var id = req.body.id;
	var resume = req.files.resume;
	delete req.body.id;
	delete req.files.resume;
     console.log(req.files);
     console.log("req.files.resume.....",resume)
	if(req.files)
	{
		var file = req.files.resume;
		var newname = changename(file.name);
		var filepath = path.resolve("public/jobseeker_resume/"+newname);
		file.mv(filepath);
		req.body.resume = newname;
		var oldfilepath = path.resolve("public/jobseeker_resume/"+resume);
		fs.unlinkSync(oldfilepath);

	}
        jobseeker_account.update({ _id : Mongodb.ObjectId(req.params.id) },req.body,function(err,result){
            if(err){
                res.status(400).json({status:0,err:"err"})
            }
            if(result){
                res.status(200).json({status:1,err:result.ops})
            }
        })
});

router.post('/delete',function(req,res){
    console.log(req.body,"DDDDDDDDDDDDDDDDDDDD")
    console.log(req.body.id)
      jobseeker_account.delete({_id:Mongodb.ObjectId(req.body.id)},function(err,result){
          if(err){
              res.status(400).json({status:0,err:"Account could not be deleted!"})
          }
          if(result){
              res.status(200).json({status:1,err:"Account deleted"})
          }
      })
})
module.exports=router;