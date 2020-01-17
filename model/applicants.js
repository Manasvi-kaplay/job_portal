var connection = require("../config/connect");
module.exports.insert=function(obj,cb){
  connection.init(function(err,client){
	var db = client.db('jobportal');
db.collection("applicants").insert(obj,cb)
});
}
module.exports.findWhere=function(obj, cb){
	connection.init(function(err, client){
		var db = client.db('jobportal');
		db.collection("applicants").find(obj).toArray(cb);
});
}
module.exports.count=function(cb){
	connection.init(function(err,client){
		var db = client.db('jobportal');
		return db.collection("jobs").find({}).count(cb);
	})
}