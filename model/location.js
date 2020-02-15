var connection = require("../config/connect");
module.exports.insert=function(obj,cb){
  connection.init(function(err,client){
	var db = client.db('jobportal');
    db.collection("location").insert(obj,cb)
});
}
module.exports.find=function(cb){
	connection.init(function(err, client){
		var db = client.db('jobportal');
		db.collection("location").find().toArray(cb);
	});
}
module.exports.count=function(cb){
	connection.init(function(err,client){
		var db = client.db('jobportal');
		return db.collection("location").find({}).count(cb);
	})
}
module.exports.findWhere=function(obj, cb){
	connection.init(function(err, client){
		var db = client.db('jobportal');
		db.collection("location").find(obj).toArray(cb);
	});
}
module.exports.update=function(where,obj,cb){
	connection.init(function(err,client){
		var db=client.db('jobportal');
  db.collection("location").updateOne(where,{$set:obj},cb)
});
}
module.exports.delete=function(obj,cb){
	connection.init(function(err,client){
		var db=client.db('jobportal');
		db.collection("location").deleteOne(obj,cb)
	})
}
