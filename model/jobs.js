var connection = require("../config/connect");
module.exports.insert=function(obj,cb,req){
  connection.init(function(err,client){
	var db = client.db('jobportal');
db.collection("jobs").insert(obj,cb)
});
}
module.exports.find=function(cb){
	connection.init(function(err, client){
		var db = client.db('jobportal');
		db.collection("jobs").find().toArray(cb);
	});
}
module.exports.count=function(){
	connection.init(function(err,client){
		var db = client.db('jobportal');
		var collection=jobs;
		console.log("heyyyyyyyyyy",db.collection.count())
	})
}
module.exports.findWhere=function(obj, cb){
	connection.init(function(err, client){
		var db = client.db('jobportal');
		db.collection("jobs").find(obj).toArray(cb);
	});
}
module.exports.update=function(where,obj,cb){
	connection.init(function(err,client){
		var db=client.db('jobportal');
  db.collection("jobs").updateOne(where,{$set:obj},cb)
});
}
module.exports.delete=function(obj,cb){
	connection.init(function(err,client){
		var db=client.db('jobportal');
		db.collection("jobs").deleteOne(obj,cb)
	})
}
