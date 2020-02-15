var express=require("express");
var router=express.Router();
var employer_account=require("../model/employer_account");
var jobseeker_account=require("../model/jobseeker_account");
var jobs=require("../model/jobs");
var Mongodb = require('mongodb');
var category=require("../model/category");
var location=require("../model/location");
router.get('/home',function(req,res){
    res.render("home");
});
router.get('/employers',function(req,res){
    employer_account.findWhere({$or:[{"status":1 },{"status":"1"}]},function(err,result){
        var pagedata = { title : "employers", pagename : "employers", data : result};
    res.render("layout",pagedata);
    });
})
router.get('/jobs',function(req,res){
    jobs.find(function(err,result){
        var pagedata = { title : "jobs", pagename : "jobs", data : result};
    res.render("layout",pagedata);
    });
})
router.get('/location',function(req,res){
location.find(function(err,result){
        var pagedata = { title : "location", pagename : "location", data : result};
    res.render("layout",pagedata);
    });
})
router.get('/category',function(req,res){
    category.find(function(err,result){
            var pagedata = { title : "category", pagename : "category", data : result};
        res.render("layout",pagedata);
        });
    })
router.get('/reg_requests',function(req,res){
    employer_account.findWhere({"status":0},function(err,result){
        var pagedata = { title : "employers", pagename : "reg_requests", data : result};
    res.render("layout",pagedata);
    });
})
router.get('/jobseekers',function(req,res){
    jobseeker_account.find(function(err,result){
        var pagedata = { title : "jobseekers", pagename : "jobseekers", data : result};
    res.render("layout",pagedata);
    });
})
router.get('/updateStatus/:id',function(req,res){
    var id=req.params.id;
    employer_account.find(function(err,result){
        if(err){
            console.log("error...",err);
        }
        if(result){
            console.log("result....",result);
            employer_account.update({_id : Mongodb.ObjectId(id) },{status:"1"},function(err,result1){
                if(err){
                    console.log("error....",err)
                    res.status(400).json({status:0,err:"Employer could not be registered due to internal error!"})
                }
                if(result1){
                    console.log("request accepted.....",result1);
                    //res.status(200).json({status:1,result:"Employer registered!"})
                    //var pagedata = { title : "requests", pagename : "reg_requests", data : result};
                    //res.render("layout",pagedata);
                }
            })
        }
        //var pagedata = { title : "update status", pagename : "update_status", data : result};
            //res.render("layout",pagedata);
    })
})
router.post('/searchByCompany',function(req,res){
    var company=req.body.company;
    if(company){
        console.log("Company......",company);
        var query= {'company': {'$regex': company,'$options': 'i'}}
        employer_account.findWhere(query,function(err,result){
        if(err){
            console.log("error",err)
            res.status(400).json({status:0,err:"Error!"})
        }
        if(result){
            console.log("success......",result)
            //res.status(200).json({status:1,result:result})
            var pagedata={title : "search results", pagename : "searchByCompany", data : result}
            res.render("layout",pagedata)
        }
    })
    }
});
router.post('/searchByName',function(req,res){
    var name=req.body.name;
    if(name){
        console.log("Name......",name);
        var query= {'name': {'$regex': name,'$options': 'i'}}
        jobseeker_account.findWhere(query,function(err,result){
        if(err){
            console.log("error",err)
            res.status(400).json({status:0,err:"Error!"})
        }
        if(result){
            console.log("success......",result)
            //res.status(200).json({status:1,result:result})
            var pagedata={title : "search results", pagename : "searchByName", data : result}
            res.render("layout",pagedata)
        }
    })
    }
});
router.post('/searchByJobTitle',function(req,res){
    var Job_title=req.body.Job_title;
    if(Job_title){
        console.log("Job title......",Job_title);
        var query= {'Job_title': {'$regex': Job_title,'$options': 'i'}}
        jobs.findWhere(query,function(err,result){
        if(err){
            console.log("error",err)
            res.status(400).json({status:0,err:"Error!"})
        }
        if(result){
            console.log("success......",result)
            //res.status(200).json({status:1,result:result})
            var pagedata={title : "search results", pagename : "searchByJobTitle", data : result}
            res.render("layout",pagedata)
        }
    })
    }
});
module.exports=router;