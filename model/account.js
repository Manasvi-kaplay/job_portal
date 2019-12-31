var connection = require("../config/connect");
module.exports.insert=function(obj,cb){
  connection.init(function(err,client){
    var db = client.db('jobportal');
db.collection("reg_employer").insert(obj,cb)
});
}
module.exports.find=function(cb){
	connection.init(function(err, client){
		var db = client.db('jobportal');
		db.collection("reg_employer").find().toArray(cb);
	});
}
module.exports.findWhere=function(obj, cb){
	connection.init(function(err, client){
		var db = client.db('jobportal');
		db.collection("reg_employer").find(obj).toArray(cb);
	});
}
