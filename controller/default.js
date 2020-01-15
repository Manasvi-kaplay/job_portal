var express=require("express");
var router=express.Router();
router.use("/admin_panel",require("./admin_panel"))
router.use("/applications",require("./applications"))
router.use("/login_employer",require("./login_employer"))
router.use("/login_jobseeker",require("./login_jobseeker"))
router.use("/login_admin",require("./login_admin"))
router.use("/reg_employer",require("./reg_employer"))
router.use("/reg_jobseeker",require("./reg_jobseeker"))
router.use("/employer_profile",require("./employer_profile"))
router.use("/jobseeker_profile",require("./jobseeker_profile"))
router.use("/jobs",require("./jobs"))
router.use("/resume",require("./resume"))
function backdoor(req, res, next)
{
	if(! req.session.is_user_logged_in)
	{
		res.redirect("/");
	}
	next();
}
module.exports=router;

