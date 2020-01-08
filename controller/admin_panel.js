var express=require("express");
var router=express.Router();
var employer_account=require("../model/employer_account");
var Mongodb = require('mongodb');
router.get('/reg_request/:status',function(req,res){
    var status=req.params.status;
    employer_account.findWhere({ status},function(err,result){
        if(err){
            console.log("error....",err)
            res.status(400).json({status:0,err:"Request cannot be satisfied"})
        }
        if(result){
            console.log("result.....",result[0])
            res.status(200).json({status:1,err:result[0]})
        }
    })
})
router.post('/update_status',function(req,res){
    employer_account.update({_id : Mongodb.ObjectId(req.body.id) },req.body,function(err,result){
        if(err){
            console.log("error....",err)
            res.status(400).json({status:0,err:"Employer could not be registered due to internal error!"})
        }
        if(result){
            res.status(200).json({status:1,err:"Employer registered!"})
        }
    })
})
module.exports=router;