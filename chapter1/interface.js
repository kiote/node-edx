/*
 *  Inserts "doc" into the collection "movies".
 */
exports.insert = function(db, doc, callback) {
 var found_status = 0;
 db.listCollections().toArray(function(err,collections){
 	if(err)
 	{
 		callback(null);
 	}
 	else
 	{
 		if(collections==="undefined")
 		{
 			db.createCollection("movies",function(err,collection){
 				if(err)
 				{
 					callback(err);
 				}
 				else
 				{
 					db.collection("movies").insert(doc,function(err,record){
 						callback(err);
 					});
 				}
 			});
 		}
 		else
 		{
 			collections.forEach(function(collection){
 				if(collection.name==="movies")
 				{
 					found_status=1;
 				}
 			});
 			if(found_status==1)
 			{
 				db.collection("movies").insert(doc,function(err,record){
 						callback(err);
 					});
 			}
 			else
 			{
 				db.createCollection("movies",function(err,collection){
 				if(err)
 				{
 					callback(err);
 				}
 				else
 				{
 					db.collection("movies").insert(doc,function(err,record){
 						callback(err);
 					});
 				}
 			});
 			}
 		}
 	}
 });
};

/*
 *  Finds all documents in the "movies" collection
 *  whose "director" field equals the given director,
 *  ordered by the movie's "title" field. See
 *  http://mongodb.github.io/node-mongodb-native/2.0/api/Cursor.html#sort
 */
exports.byDirector = function(db, director, callback) {
  db.collection("movies").find({"director":director}).sort({"title":1}).toArray(function(err,recs){
  	callback(err,recs);
  });
};