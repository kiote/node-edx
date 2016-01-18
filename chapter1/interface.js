/*
 *  Inserts "doc" into the collection "movies".
 */
exports.insert = function(db, doc, callback) {
  var collection = db.collection('movies');
  collection.insertOne(doc);
  callback(null);
};

/*
 *  Finds all documents in the "movies" collection
 *  whose "director" field equals the given director,
 *  ordered by the movie's "title" field. See
 *  http://mongodb.github.io/node-mongodb-native/2.0/api/Cursor.html#sort
 */
exports.byDirector = function(db, director, callback) {
  var collection = db.collection('movies');
  collection.sort({'title': 1}).find({'director': director}, function(err, cursor(){
    cursor.toArray(callback);
  }));
  callback(null, []);
};
