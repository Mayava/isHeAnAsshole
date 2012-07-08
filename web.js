var http = require('http');
var util = require('util');
var querystring = require('querystring');
// var mongo = require('mongodb');

// var host = process.env.MONGOHQ_URL || "mongodb://@127.0.0.1:27017";
// 
// mongo.Db.connect(process.env.MONGOHQ_URL, function(error, client) {
// 	if (error) throw error;
// 	
// 	var collection = new mongo.Collection(client, 'test_collection');
// 	
// 	var app = http.createServer( function (request, response) {
// 		
// 		//Let's get this into its own function so we can just do a getQuestions()
// 		if (request.method==="GET"&&request.url==="/questions/list.json") {			
// 			collection.find().toArray(function(error,results) {
// 				response.writeHead(200,{'Content-Type':'text/plain'});
// 				//Here is where we should set our cookie as no one's doing anything if its not from the homepage
// 				//Maybe write a separate function to handle this separately for each request type
// 				console.dir(results);
// 				response.end(JSON.stringify(results));
// 			});
// 		};
// 		
// 		//Let's get this into its own function so we can just do a createQuestion(question);
// 		if (request.method==="POST"&&request.url==="/questions/create.json") {
// 			request.on('data', function(data) {
// 				collection.insert(querystring.parse(data.toString('utf-8')), {safe:true}, function(error, obj) {
// 					if (error) throw error;
// 					response.end(JSON.stringify(obj));
// 				})				
// 			})
// 
// 		};
// 		
// 		//Let's get this into its own function, so we can just do a updateVotes();
// 		if (request.method==="PUT"&&request.url==="/questions/vote.json") { //Need to verify this one
// 			request.on('data', function(data) {
// 				//parse query string so we can do $inc where appropriate and $push where appropriate
// 				//var cookie = response.getHeader('Cookie');
// 				//collection.find() based on the cookie? { "_id" : ObjectId("4ff91967799a458364000001")
// 				//or response.writeHead(200, {'Content-Type': 'text/plain', "Set-Cookie" : ["user=Math.floor(Math.rand()*100000)", , "language=javascript"]  })
// 				//If new do response.setHeader("Set-Cookie", ["user=Math.floor(Math.rand()*100000)", "language=javascript"]);
// 				//Do we need to do a writeHead after?
// 				//If existing, they can change their yes/no vote but the total votes should stay the same
// 				collection.insert(querystring.parse(data.toString('utf-8'), {safe:true}, function(error, obj) {
// 					if (error) throw error;
// 					response.end(JSON.stringify(obj));
// 				})				
// 			})
// 
// 		};
// 
// 	});
// 	var port = process.env.PORT || 5000;
// 	app.listen(port);
// })





// > t.find()
// { "_id" : ObjectId("4b97e62bf1d8c7152c9ccb74"), "title" : "ABC",
//   "comments" : [ { "by" : "joe", "votes" : 3 }, { "by" : "jane", "votes" : 7 } ] }
// 
// > t.update( {'comments.by':'joe'}, {$inc:{'comments.$.votes':1}}, false, true )
// 
// > t.find()
// { "_id" : ObjectId("4b97e62bf1d8c7152c9ccb74"), "title" : "ABC",
//   "comments" : [ { "by" : "joe", "votes" : 4 }, { "by" : "jane", "votes" : 7 } ] }

//{ $inc : { field : value } } for yes or no
//{ $push : { field : value } } for user


// //Original post
// curl -d "question=how-many-times-can-he-do-that-thing-he-does-that-pisses-me-off-to-no-end" http://something.heroku.com/questions/create.json
// // Need to initialize a new question and generate timestamp, updated at, IP address_by
// 
// //Voting yes
// curl -d "question_id=4ff91967799a458364000001&yes=1&user=SOMEIPADDRESSHERE" http://something.heroku.com/vote.json
// or
// curl -d "question_id=4ff91967799a458364000001&yes=1SOMEIPADDRESSHERE" http://something.heroku.com/vote.json
// // if yes.length > 1 or no.length > 1, do this.  
// // takes response [0] and add it to count
// // push the rest into the voters array
// 
// //Voting no
// curl -d "question_id=4ff91967799a458364000001&no=1&user=SOMEIPADDRESSHERE" http://something.heroku.com/vote.json
// // see above

