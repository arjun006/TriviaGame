$(document).ready(function(){

//Trivia Questions

var triviaQuestions = [{
    question: "What is the name of Jon Snow's direwolf?",
    answerOptions:["Ghost","Snow","Wolfy","Pineapples"],
    answer:[0]

},{ question: "Who does Tyrion Lannister kill with a crossbow?",
    answerOptions:["Khal Drogo","Eddard Stark","Theon Greyjoy","Tywin Lannister"],
    answer:[3]

},{
    question: "What is the name of Arya Starks sword?",
    answerOptions:["Pencil","Stabby","Pokey","Needle"],
    answer:[3]
},{
    question: "Which character sentenced Petyr Baelish to death?",
    answerOptions:["Cersei Lannister","Jon Snow","Sansa Stark","Arya Stark"],
    answer:[2]
},{
    question: "Who is Jon Snows's real father?",
    answerOptions:["Tywin Lannister","Rhaegar Targaryen","Ned Stark","Ron Snow"],
    answer:[1]
},{
    question: "What is Sandor Clegane's nickname?",
    answerOptions:["The Hound","The Beast","The Warrior","Bunny"],
    answer:[0]
},{
    question: "",
    answerOptions:["1","2","3","4"],
    answer:[0]
},{
    question: "...",
    answerOptions:["1","2","3","4"],
    answer:[1]
}];

var currentQuestion;
var totalQuestions= triviaQuestions.length;

var rightAnswer;
var wrongAnswer;
var unaswered;
var timeLeft;
var seconds;
var isAnswered=false;
var playerChoice;

//Start Game and Play Again functions
$("#start-button").on("click", function(){
    $(".instructions").hide();
    $(this).hide();
    newGame();
});

$("#playAgainButton").on("click", function(){
    $(this).hide();
    newGame();
});


function newGame(){
    $("#finalResult").empty();
    $("#correctAnswers").empty();
    $("#wrongAnswers").empty();
    $("#unanswered").empty();
    $("#playAgainButton").empty();
    currentQuestion=0;
    rightAnswer=0;
    wrongAnswer=0;
    unanswered=0;
    Question();
}

//Show Question functions
function Question(){
    $("#playerResult").empty();
    $("#message").empty();
    $("#rightAnswer").empty();
    $("#image").empty();
    isAnswered=true;

    $("#currentQuestion").html("Q. " + (currentQuestion + 1) + "/" + totalQuestions);
    $(".question").html("<h3>" + triviaQuestions[currentQuestion].question + "</h3>");
    var i;
    for(i=0; i < 4; i++){
        var options=$("<div>");
        options.text(triviaQuestions[currentQuestion].answerOptions[i]);
        options.attr({"data-index": i});
        options.addClass("currentChoice");
        $(".answers").append(options);
    };
    timer();
    $(".currentChoice").on("click", function(){
        playerChoice = $(this).data("index");
        clearInterval(time);
        Solution();
    });

};
//Timer Functions


function showTimer(){
   seconds--; 
   $("#timer").html("<h3>"+ "Time Left: " + seconds + "</h3>")
    if(seconds < 1){
        clearInterval(time);
        answered=false;
        Solution();
    }

}
function timer(){
    seconds=10;
    $("#timer").html("<h3>"+ "Time Left: " + seconds + "</h3>")
    isAnswered = true;
    time = setInterval(showTimer, 1000);
        
    }

function Solution(){
    $("#currentQuestion").empty();
	$(".currentChoice").empty();
	$(".question").empty();

	var answerText = triviaQuestions[currentQuestion].answerOptions[triviaQuestions[currentQuestion].answer];
	var answerIndex = triviaQuestions[currentQuestion].answer;
	
	//checks to see correct, incorrect, or unanswered
	if((playerChoice == answerIndex) && (isAnswered == true)){
		rightAnswer++;
		$("#playerResult").html("That's Right!");
	} else if((playerChoice != answerIndex) && (isAnswered == true)){
        wrongAnswer++;
        $("#playerResult").html("Not even close!")
		$("#correctedAnswer").html("The correct answer was: " + answerText);
	} else{
        unanswered++;
        $("#playerResult").html("You ran out of time!")
		$("#rightAnswer").html("The correct answer was: " + answerText);
		isAnswered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(quizResult, 1000)
	} else{
		currentQuestion++;
		setTimeout(Question, 1000);
	}	
}


console.log(quizScore);

function quizResult(){
    $("#timer").empty();
    $("#rightAnswer").empty();
    $("#playerResult").empty();
    var totalQuestions = triviaQuestions.length;
    var quizScore = (rightAnswer/8) * 100;
    if(rightAnswer == totalQuestions){
        $("#message").html("You are the one true King of The North")
    }
    else if(rightAnswer < (totalQuestions-5)){
            $("#message").html("You are a peasant of Westeros")
    }else if(rightAnswer < (totalQuestions-2)){
        $("#message").html("Well done, but you aren't ready to rule yet...")
    }
    $("#finalResult").html("You scored " + quizScore + "%");
    $("#correctAnswers").html("Right: " + rightAnswer);
	$("#wrongAnswers").html("Wrong: " + wrongAnswer);
	$("#unanswered").html("Unanswered: " + unanswered);
	$("#playAgainButton").addClass("btn btn-primary btn-lg btn-outline-light");
	$("#playAgainButton").show();
	$("#playAgainButton").html("Play Again?");
};



});
