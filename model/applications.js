var connection = require("../config/connect");
module.exports.insert=function(obj,cb,req){
  connection.init(function(err,client){
	var db = client.db('jobportal');
db.collection("applications").insert(obj,cb)
});
}