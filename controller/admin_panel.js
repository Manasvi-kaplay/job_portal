var express=require("express");
var router=express.Router();
var employer_account=require("../model/employer_account");
var Mongodb = require('mongodb');
router.get('/reg_request',function(req,res){
    employer_account.findWhere({ _id : Mongodb.ObjectId(req.body.id) })
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