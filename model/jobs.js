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
module.exports.count=function(cb){
	connection.init(function(err,client){
		var db = client.db('jobportal');
		return db.collection("jobs").find({}).count(cb);
	})
}
module.exports.search=function(obj,cb){
	connection.init(function(err,client){
		var db=client.db('jobportal');
		db.collection("jobs").find(	new RegExp('^' + obj + '$','i'),cb)
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
