var express=require("express");
var router=express.Router();
var employer_account=require("../model/employer_account");
var Mongodb=require("mongodb");
var jobs=require("../model/jobs");
router.post('/view_profile',function(req,res){
    var id=req.body.id;
    console.log("req.query....",req.query)
    console.log("req.params....",req.params)
    employer_account.findWhere({ _id : Mongodb.ObjectId(id) }, function(err, result){
      var prodata=result[0];
           console.log("profile...",prodata);
      jobs.findWhere({employer_id:id},function(err,result1){
            var data=result1;
            console.log("jobs posted...",data);
            if(data){
              res.status(200).json({status:1,result:{prodata,data}})
            }
              else{
                res.status(200).json({status:"No jobs posted!",result:prodata})
              }
          })
    });
})
module.exports=router;