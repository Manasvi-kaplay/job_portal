var express=require("express");
var router=express.Router();
var jobs=require("../model/jobs");
var employer_account=require("../model/employer_account");
var Mongodb = require('mongodb');
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
            var data=result[0];
            console.log("success...",data)
            res.status(200).json({status:1,result:data})
        }
    })
})
router.post('/view_by_filters',function(req,res){
    var Category=req.body.Category;
    var Location=req.body.Location;
    var job_type=req.body.job_type;
    if(Category && !Location && !job_type){
        console.log("Category......",Category);
        var query= {'Category': {'$regex': Category,'$options': 'i'}}
        jobs.findWhere(query,function(err,result){
        if(err){
            console.log("error",err)
            res.status(400).json({status:0,err:"Error!"})
        }
        if(result){
            console.log("success......",result)
            res.status(200).json({status:1,result:result})
        }
    })
    }
    if(Location && !Category && !job_type){
        console.log("Location......",Location);
        var query= {'Location': {'$regex': Location,'$options': 'i'}}
     jobs.findWhere(query,function(err,result){
    if(err){
        console.log("error",err)
        res.status(400).json({status:0,err:"Error!"})
            }
    if(result){
        console.log("success......",result)
        res.status(200).json({status:1,result:result})
                }
            })
    }
    if(job_type && !Category && !Location){
        console.log("job_type......",Location);
        var query= {'Location': {'$regex': Location,'$options': 'i'}}
     jobs.findWhere(query,function(err,result){
    if(err){
        console.log("error",err)
        res.status(400).json({status:0,err:"Error!"})
            }
    if(result){
        console.log("success......",result)
        res.status(200).json({status:1,result:result})
                }
            })
        }
    if(Category && Location && !job_type){
    var query= {$and:[{'Category': {'$regex': Category,'$options': 'i'}},{'Location': {'$regex': Location,'$options': 'i'}}]}
    jobs.findWhere(query,function(err,result){
    if(err){
        console.log("error",err)
        res.status(400).json({status:0,err:"Error!"})
    }
    if(result){
        console.log("success......",result)
        res.status(200).json({status:1,result:result})
    }
    })
    }
    if(Location && job_type && !Category){
        var query= {$and:[{'Location': {'$regex': Location,'$options': 'i'}},{'job_type': {'$regex': job_type,'$options': 'i'}}]}
    jobs.findWhere(query,function(err,result){
    if(err){
        console.log("error",err)
        res.status(400).json({status:0,err:"Error!"})
    }
    if(result){
        console.log("success......",result)
        res.status(200).json({status:1,result:result})
    }
    })
    }
    if(Category && job_type && !Location){
        var query= {$and:[{'Category': {'$regex': Category,'$options': 'i'}},{'job_type': {'$regex': job_type,'$options': 'i'}}]}
    jobs.findWhere(query,function(err,result){
    if(err){
        console.log("error",err)
        res.status(400).json({status:0,err:"Error!"})
    }
    if(result){
        console.log("success......",result)
        res.status(200).json({status:1,result:result})
    }
    })
    }
    if(Category && Location && job_type){
    var query= {$and:[{'Category': {'$regex': Category,'$options': 'i'}},{'Location': {'$regex': Location,'$options': 'i'}},{'job_type': {'$regex': job_type,'$options': 'i'}}]}
    jobs.findWhere(query,function(err,result){
    if(err){
        console.log("error",err)
        res.status(400).json({status:0,err:"Error!"})
    }
    if(result){
        console.log("success......",result)
        res.status(200).json({status:1,result:result})
    }
    })
}
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