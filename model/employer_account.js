var connection = require("../config/connect");
module.exports.insert=function(obj,cb){
  connection.init(function(err,client){
	  if(err){
		  
	  }
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
module.exports.update=function(where,obj,cb){
	connection.init(function(err,client){
		var db=client.db('jobportal');
  db.collection("reg_employer").updateOne(where,{$set:obj},cb)
});
}
module.exports.delete=function(obj,cb){
	connection.init(function(err,client){
		var db=client.db('jobportal');
		db.collection("reg_employer").remove(obj,cb);
	})
}
