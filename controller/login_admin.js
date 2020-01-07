var express=require("express");
var router=express.Router();
var connection=require("../config/connect")
router.post('/login_admin',function(req,res){
    console.log(req.body)
  connection.init(function(err, client){
    var db = client.db('jobportal');
    var username=req.body.username;
    var password=req.body.password;
    db.collection('admin_login').find( { username:username } ).toArray(function(err,user){
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
      res.status(200).json({status:1,err:"welcome to admin panel"})
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
module.exports=router;
