var connection = require("../config/connect");
module.exports.insert=function(obj,cb){
  connection.init(function(err,client){
	var db = client.db('jobportal');
    db.collection("category").insert(obj,cb)
});
}
module.exports.find=function(cb){
	connection.init(function(err, client){
		var db = client.db('jobportal');
		db.collection("category").find().toArray(cb);
	});
}
/*module.exports.find=function(obj,cb){
	connection.init(function(err, client){
		var db = client.db('jobportal');
		//find({},obj).toArray(cb);
		db.collection("category").find().project(obj).toArray(cb)
	});
}*/
module.exports.count=function(cb){
	connection.init(function(err,client){
		var db = client.db('jobportal');
		return db.collection("category").find({}).count(cb);
	})
}
module.exports.findWhere=function(obj, cb){
	connection.init(function(err, client){
		var db = client.db('jobportal');
		db.collection("category").find(obj).toArray(cb);
	});
}
module.exports.update=function(where,obj,cb){
	connection.init(function(err,client){
		var db=client.db('jobportal');
  db.collection("category").updateOne(where,{$set:obj},cb)
});
}
module.exports.delete=function(obj,cb){
	connection.init(function(err,client){
		var db=client.db('jobportal');
		db.collection("category").deleteOne(obj,cb)
	})
}
