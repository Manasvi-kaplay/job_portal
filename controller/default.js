var express=require("express");
var router=express.Router();
// router.use("/", require("./login"));
router.use("/reg_employer",require("./reg_employer"))
//router.use("/reg_jobseeker",require("./reg_jobseeker"))
function backdoor(req, res, next)
{
	if(! req.session.is_user_logged_in)
	{
		res.redirect("/");
	}
	next();
}
module.exports=router;
