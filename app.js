/////////////////////////////////////////////////////////////////////////////
// Work in progress
/////////////////////////////////////////////////////////////////////////////

var parseID = "r79bg3P89fRnRLkWjvTqedfGGanHJztcktGiD3yU";
var parseKey = "PpTohDAr5D7jEc5oQOhZnV6Bu2Ramk135n29gV6M";

$(document).ready(function(){
	getQuestions(); //getQuestions to start
	
	$(".new-question").keyup(function (e) { 
	  	if (e.keyCode === 13) { 
			e.preventDefault();
			$("#send").click(); 
		}
	});
	
	$("#send").click(function(){
		var question = $("input[name=question]").attr('value');
		console.log(question)
		console.log("!")
		postQuestion(question);
	});

})

/////////////////////////////////////////////////////////////////////////////
// get all questions
/////////////////////////////////////////////////////////////////////////////

function getQuestions(){
	//Need to getCookies();
	
	$.ajax({
		url: " https://api.parse.com/1/classes/questions", 
		headers: {
			"X-Parse-Application-Id": parseID,
			"X-Parse-REST-API-Key": parseKey
		},
		contentType: "application/json",
		dataType: "json",
		type: 'GET',
		success: function(data) {
			console.log("get");
			updateView(data);
		},
		error: function() {
			console.log("error");
		}
	});
}

/////////////////////////////////////////////////////////////////////////////
// udpate the view loading any questions that've been posted recently
/////////////////////////////////////////////////////////////////////////////

function updateView(questions) {	
	var table=$(".table tbody"); //need to confirm this is the same
	table.html('');
	$.each(questions.results, function (index, value) {
		//Need to add the id for the question here
		var trEl=$('<tr><td>'+value.question+'</td><td><a id="' + value.objectId + '" class="btn vote" data-toggle="button" vote="yes">Yes way</a><a id="' + value.objectId + '" class="btn vote" data-toggle="button" vote="no">No way</a>'+ value.yes + '	|	' + value.no + '</td></tr>');		
		table.append(trEl);		
	});

	console.log(questions);
		
	$("a.vote").click(function(){
		var questionId = $(this).attr("id"); 
		var vote = $(this).attr("vote");
		console.log(questionId, vote)
		voteQuestion(questionId, vote);
	});
}

/////////////////////////////////////////////////////////////////////////////
// post a new question to the list
/////////////////////////////////////////////////////////////////////////////

function postQuestion(question){
	//backbone	
	
	$.ajax({
		url: " https://api.parse.com/1/classes/questions", //Make sure this URL is correct
		headers: {
			"X-Parse-Application-Id": parseID,
			"X-Parse-REST-API-Key": parseKey
		},
		contentType: "application/json",
		dataType: "json",
		processData: false,
		data: JSON.stringify({
			"question": question,
		}),
		type: 'POST',
		success: function() {
			console.log("sent");
			getQuestions(); //getQuestions after you post
		},
		error: function() {
			console.log("error");
		}
	});
}

/////////////////////////////////////////////////////////////////////////////
// update an existing question based on questionId
/////////////////////////////////////////////////////////////////////////////
function voteQuestion(questionId, vote){
	//Need to getCookies();
	
	var yesAmount = ((vote === "yes") ? 1 : 0);
	var noAmount = ((vote === "no") ? 1 : 0);
	
	$.ajax({
		url: " https://api.parse.com/1/classes/questions/" + questionId, //Make sure this URL is correct
		headers: {
			"X-Parse-Application-Id": parseID,
			"X-Parse-REST-API-Key": parseKey
		},
		contentType: "application/json",
		dataType: "json",
		processData: false,
		data: JSON.stringify({
			"objectId": questionId, //needs the ObjectID('num') here;
			"yes": {"__op":"Increment","amount":yesAmount},
			"no" : {"__op":"Increment","amount":noAmount}
		}),
		type: 'PUT',
		success: function() {
			console.log("voted");
			//getQuestions(); how do we update the button to display
		},
		error: function() {
			console.log("error");
		}
	});
}

//Separate getCookies function
// function getCookies(){
// 	
// }