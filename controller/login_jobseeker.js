var express=require("express");
var router=express.Router();
var connection=require("../config/connect")
var config=require("./config");
var jwt=require("jsonwebtoken");
var nodemailer=require("nodemailer");
var jobseeker_account=require("../model/jobseeker_account");
router.post('/login_jobseeker',function(req,res){
      console.log(req.body)
    connection.init(function(err, client){
      var db = client.db('jobportal');
      var email=req.body.email;
      var password=req.body.password;
      db.collection('reg_jobseeker').find({ $or: [ { email:email }, { mobile:email } ] }).toArray(function(err,user){
        //db.collection('userprofile').findOne({ email:email},{mobileno:mobileno}, function(err, user) {
          console.log("user[0].......",user[0])
            if(err){
              console.log("error")
              res.status(400).json({status:0,err:err})
            }
        if(user.length==0){
          res.status(400).json({status:0,err:"username or password incorrect!!"})
        }
        else{
			var data = user[0];
			if(data.password == password)
			{
				req.session.userid = data._id;
				req.session.email = data.email;
        req.session.is_user_logged_in=true;
        console.log("Successful login!")
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(400).json({status:1,err:"welcome!",token:token})
        //res.redirect('/login_employer');
			}
			else
			{
        res.status(400).json({status:0,err:"username or password incorrect!!"})
        //res.redirect('/login_employer');
			}
		        }
  });
  });                           
  })
  router.post('/forgot_password',function(req,res){
    var email=req.body.email;
    jobseeker_account.findWhere({ email:email}, function(err, user) {
      if(err){
        console.log("error")
        res.status(400).json({status:0,err:err})
      }
      if(user.length==0){
        res.status(400).json({status:0,err:"No such email id found!"})
      }
      else{  
        var random=Math.floor(Math.random() * (99999 - 10000) + 10000);      
        if(user.length>0){
          jobseeker_account.update({ email:email },{otp:random},function(err,result){
            if(err){
                res.status(400).json({status:0,err:"err"})
            }
            if(result){
            //Code for sending otp to mentioned email id for resetting password:
              var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'manasvi111.kaplay@gmail.com',
                  pass: '100Scholars'
                }
              });
              var mailOptions = {
                from: 'manasvi111.kaplay@gmail.com',
                to: email,
                subject: 'Your password',
                html:'<h1>Your otp to reset password is:</h1>'+random
              };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
                res.status(200).json({status:1,result:"successful update"})
            }
        });
         }
        else{
          res.status(400).json({status:0,err:"No such email id found!"})
        }
      }
    });
  });
  router.post('/check_otp',function(req,res){
    var email=req.body.email;
    var otp=req.body.otp;
    jobseeker_account.findWhere({email:email},function(err,result){
      if(err){
        console.log(err);
        res.status(400).json({status:0,err:err})
      }
      if(result.length==0){
        res.status(400).json({status:0,err:"No such email found!!"})
      }
      else{
        var data=result[0];
        if(data.otp==otp){
          res.status(200).json({status:1,result:"Correct otp entered"})
        }
        else{
          res.status(400).json({status:0,err:"Otp invalid!"})
        }
      }
    })
  });
  router.post('/update_password',function(req,res){
    var email=req.body.email;
    var password=req.body.password;
    jobseeker_account.update({ email:email},{password:password},function(err,result){
      if(err){
          res.status(400).json({status:0,err:"err"})
      }
      if(result){
          res.status(200).json({status:1,result:"successful update"})
      }
  });
  });
  module.exports=router;