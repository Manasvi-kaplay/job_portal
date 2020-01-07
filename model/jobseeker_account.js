var connection = require("../config/connect");
module.exports.insert=function(obj,cb){
  connection.init(function(err,client){
    var db = client.db('jobportal');
db.collection("reg_jobseeker").insert(obj,cb)
});
}
module.exports.find=function(cb){
	connection.init(function(err, client){
		var db = client.db('jobportal');
		db.collection("reg_jobseeker").find().toArray(cb);
	});
}
module.exports.findWhere=function(obj, cb){
	connection.init(function(err, client){
		var db = client.db('jobportal');
		db.collection("reg_jobseeker").find(obj).toArray(cb);
	});
}
module.exports.update=function(where,obj,cb){
	connection.init(function(err,client){
		var db=client.db('jobportal');
  db.collection("reg_jobseeker").updateOne(where,{$set:obj},cb,function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
	});
});
}
module.exports.delete=function(obj,cb){
	connection.init(function(err,client){
		var db=client.db('jobportal');
		db.collection("reg_employer").remove(obj,cb);
	})
}