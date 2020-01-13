var express=require("express");
var resume=require("../model/resume");
var router=express.Router();
var Mongodb = require('mongodb');
router.post('/addresume',function(req,res){
    resume.insert(req.body,function(err,result)
    {
        if(err){
            res.status(400).json({status:0,err:"err"})
        }
        if(result){
            res.status(200).json({status:1,result:result.ops})
        }
    });
})
router.post('/edit',function(req,res){
    console.log(req.body,"req.body")
  var name=req.body.name;
  var email=req.body.email;
  var mobile=req.body.mobile;
  var current_city=req.body.current_city;
    resume.update({ _id : Mongodb.ObjectId(req.body.id) },{name:name,email:email,mobile:mobile,current_city:current_city},function(err,result){
        if(err){
            res.status(400).json({status:0,err:"err"})
        }
        if(result){
            res.status(200).json({status:1,err:result.ops})
        }
    })
})
router.post('/edit_education',function(req,res){
    var education=req.body.education;
    resume.update({ _id : Mongodb.ObjectId(req.body.id) },{education:education},function(err,result){
        if(err){
            console.log(err)
            res.status(400).json({status:0,err:"error"})
        }
        if(result){
            res.status(200).json({status:1,err:result.ops})
        }
    })
})
module.exports=router;