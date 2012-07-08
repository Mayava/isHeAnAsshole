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
		var question = $("textarea[name=question]").attr('value');
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
	var randomCookieNum = Math.floor(Math.random()*10000);
	if ($.cookie("cabu" != true)){
		$.cookie("cabu",randomCookieNum, { expires: 100 });
	}
	
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
	var questionsList=$("#voting"); 
	questionsList.html('');
	$.each(questions.results, function (index, value) {	
		var questionText = '<div class="span8"><p class="questionText">' + value.question + '</p></div>';
		var yesButton = '<div class="span2"><a id="' + value.objectId + '" class="btn btn-success vote" type="submit" vote="yes"><i class="icon-thumbs-up icon-white"></i>Legitimate</a></div>';
		var noButton = '<div class="span2"><a id="' + value.objectId + '" class="btn btn-danger vote" type="submit" vote="no"><i class="icon-thumbs-down icon-white"></i>Hell no</a></div></div>';
		// var votingResults = '<div class="span1 invisible">' + value.yes + '</div>' + '<div class="span1 invisible">' + value.no + '</div>';
		
		questionsList.append(questionText,yesButton,noButton);
	});
		
	$("a.vote").click(function(){
		var questionId = $(this).attr("id"); 
		var vote = $(this).attr("vote");
		console.log(questionId, vote)
		voteQuestion(questionId, vote);
		$(this).addClass("invisible");
	});
}

/////////////////////////////////////////////////////////////////////////////
// post a new question to the list
/////////////////////////////////////////////////////////////////////////////

function postQuestion(question){
	
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
	console.log("Here is our cookie " + $.cookie("cabu"));
	
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