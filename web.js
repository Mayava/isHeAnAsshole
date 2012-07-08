var http = require('http');
var util = require('util');
var querystring = require('querystring');
var mongo = require('mongodb');


var host = process.env.MONGOHQ_URL || "mongodb://@127.0.0.1:27017";

mongo.Db.connect(process.env.MONGOHQ_URL, function(error, client) {
	if (error) throw error;
	
	var collection = new mongo.Collection(client, 'test_collection');
	
	var app = http.createServer( function (request, response) {
		if (request.method==="GET"&&request.url==="/questions/list.json") { 
			collection.find().toArray(function(error,results) {
				response.writeHead(200,{'Content-Type':'text/plain'});
				console.dir(results);
				response.end(JSON.stringify(results));
			});
		};
		if (request.method==="POST"&&request.url==="/questions/create.json") {
			request.on('data', function(data) {
				collection.insert(querystring.parse(data.toString('utf-8')), {safe:true}, function(error, obj) {
					if (error) throw error;
					response.end(JSON.stringify(obj));
				})				
			})

		};
		if (request.method==="PUT"&&request.url==="/questions/vote.json") { //Need to verify this one
			request.on('data', function(data) {
				collection.insert(querystring.parse(data.toString('utf-8')), {safe:true}, function(error, obj) {
					if (error) throw error;
					response.end(JSON.stringify(obj));
				})				
			})

		};

	});
	var port = process.env.PORT || 5000;
	app.listen(port);
})
// //Original post
// curl -d "question=how-many-times-can-he-do-that-thing-he-does-that-pisses-me-off-to-no-end" http://something.heroku.com/create.json
// // Need to initialize a new question and generate timestamp, updated at, IP address_by
// 
// //Voting yes
// curl -d "question_id=34567&yes=1SOMEIPADDRESSHERE&no=0" http://something.heroku.com/create.json
// // if yes.length > 1 or no.length > 1, do this.  
// // takes response [0] and add it to count
// // push the rest into the voters array
// 
// //Voting no
// curl -d "question_id=34567&yes=0&no=1SOMEIPADDRESSHERE" http://something.heroku.com/create.json
// // see above

