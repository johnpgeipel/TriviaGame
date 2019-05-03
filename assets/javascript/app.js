$(document).ready(function() {

    $("#cheese").delay(500).animate({ opacity: 1 }, 700)
    $(".mainArea").delay(1000).animate({ opacity: 1 }, 700)
    $(".startButton").delay(500).animate({ opacity: 1 }, 700)
    // VARIABLES:
    // declare vars for startScreen,
    // gameHTML, correct, incorrect, unanswered
    // questions, counter, clock, selcterAnswer, questionArray
    var startScreen;
	var gameHTML;
	var correct = 0;
	var incorrect = 0;
	var unanswered = 0;
	var questionCounter = 0;
	var counter = 20;
	var clock;
	var selecterAnswer;

    // QUESTION_ANSWER ARRAY:
        // build question array with answer array containing values for answer text & boolean
        // array should contain question: "lorem", answer: [string]
        // array should contain the multiple choices and a boolean value 
    var questionArray = [
        { 	
            question: 'What was the first name-controlled ("A.O.C.") cheese?',
            answers: [
                {text: "Some Answer", isCorrect: true},
                {text: "Some Answer", isCorrect: false},
                {text: "Some Answer", isCorrect: false},
                {text: "Some Answer", isCorrect: false}
            ]
        },
        { 	
            question: "Some question",
            answers: [
                {text: "Some Answer", isCorrect: true},
                {text: "Some Answer", isCorrect: false},
                {text: "Some Answer", isCorrect: false},
                {text: "Some Answer", isCorrect: false}
            ]
        },
        { 	
            question: "Some question",
            answers: [
                {text: "Some Answer", isCorrect: true},
                {text: "Some Answer", isCorrect: false},
                {text: "Some Answer", isCorrect: false},
                {text: "Some Answer", isCorrect: false}
            ]
        },
        { 	
            question: "Some question",
            answers: [
                {text: "Some Answer", isCorrect: true},
                {text: "Some Answer", isCorrect: false},
                {text: "Some Answer", isCorrect: false},
                {text: "Some Answer", isCorrect: false}
            ]
        },
        { 	
            question: "Some question",
            answers: [
                {text: "Some Answer", isCorrect: true},
                {text: "Some Answer", isCorrect: false},
                {text: "Some Answer", isCorrect: false},
                {text: "Some Answer", isCorrect: false}
            ]
        },
        { 	
            question: "Some question",
            answers: [
                {text: "Some Answer", isCorrect: true},
                {text: "Some Answer", isCorrect: false},
                {text: "Some Answer", isCorrect: false},
                {text: "Some Answer", isCorrect: false}
            ]
        },
        { 	
            question: "Some question",
            answers: [
                {text: "Some Answer", isCorrect: true},
                {text: "Some Answer", isCorrect: false},
                {text: "Some Answer", isCorrect: false},
                {text: "Some Answer", isCorrect: false}
            ]
        },
        { 	
            question: "Some question",
            answers: [
                {text: "Some Answer", isCorrect: true},
                {text: "Some Answer", isCorrect: false},
                {text: "Some Answer", isCorrect: false},
                {text: "Some Answer", isCorrect: false}
            ]
        },
        { 	
            question: "Some question",
            answers: [
                {text: "Some Answer", isCorrect: true},
                {text: "Some Answer", isCorrect: false},
                {text: "Some Answer", isCorrect: false},
                {text: "Some Answer", isCorrect: false}
            ]
        },
        { 	
            question: "Some question",
            answers: [
                {text: "Some Answer", isCorrect: true},
                {text: "Some Answer", isCorrect: false},
                {text: "Some Answer", isCorrect: false},
                {text: "Some Answer", isCorrect: false}
            ]
        },
    ]

    // HTML SET_UP Functions:
    // write function for generateHTML
    // generateHTML will set up the page
        // generateHTML will include the timer and the question for the game
        // this will also need the answers displayed and looped thru
    function generateHTML() {
        var timeRemainingText = "<p class='timerText text-center'>Time Remaining: <span id='timer'>20</span></p>";
        var questionText = "<p class='questionText text-center'>" + questionArray[questionCounter].question + "</p>";
        gameHTML = timeRemainingText + questionText;
        $(".mainArea").html(gameHTML);
        for (var i = 0; i < questionArray[questionCounter].answers.length; i++) {
            var answerButton = $("<button>");
            answerButton.addClass("answer btn btn-block text-center");
            answerButton.attr("isCorrect", questionArray[questionCounter].answers[i].isCorrect);
            answerButton.html(questionArray[questionCounter].answers[i].text);
            $(".mainArea").append(answerButton);
        }
    }

     // WIN & LOSS Funcitons:
        // write functions for the outcomes of wins and losses
        // these will increase the win/loss counters by ++ with every guess, or timeout
        // these will also generate text to notify player if answer was correct/incorrect
        // these will also generate an image
        // these should also contain the setTimeOut for the pause between plays
        // there may have to be a seperate function for the timeout if player doesn't answer in time, thus adding to the unanswered count
    function generateWin() {
        correct++;
        var correctAnswerText = "<p class='correctText text-center'>Correct!</p>";
        var imgHTML = "<img class='center-block imgCorrect' src=''>";
        gameHTML = correctAnswerText + imgHTML;
        $(".mainArea").html(gameHTML);
        setTimeout(nextDisplay, 3000);  
    }

    function generateLoss() {
        incorrect++;
        var wrongAnswerText = "<p class='wrongText text-center'>Incorrect</p>";
        var imgHTML = "<img class='center-block imgWrong' src=''>";
        gameHTML = wrongAnswerText + imgHTML;
        $(".mainArea").html(gameHTML);
        setTimeout(nextDisplay, 3000); 
    }
    // TIMEOUT Function... for unanswered questions
    function generateLossAtTimeOut() {
		unanswered++;
		var timeOutText = "<p class='timeOutText text-center'>TIME'S UP!</p>";
		var imgHTML = "<img class='center-block imgWrong' src=''>";
		gameHTML =  timeOutText + imgHTML;
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000);  
	}

    // TIMER Function:
        // write funciton for the timer
            // timer will need if/else for stopping, when player answers
            // timer will need reset or stop at loss
            // will need to generate text to html
    function timer() {
        clock = setInterval(twentySeconds, 1000);
        function twentySeconds() {
            if (counter === 0) {
                clearInterval(clock);
                generateLossAtTimeOut();
            } else if (counter > 0) {
                counter--;
            }
            $("#timer").html(counter);
        }
    }
    function nextDisplay() {
		if (questionCounter < questionArray.length - 1) {
			questionCounter++;
			generateHTML();
			counter = 20;
			timer();
		} else {
			finalScreen();
		}
    }
    
    function finalScreen() {
		var finishedText = "<p class='finishedText text-center'>Here's how you did!</p>";
		var summaryCorrectHTML = "<p class='summaryCorrect text-center'>Correct Answers: " + correct + "</p>";
		var summaryWrongHTML = "<p class='summaryWrong text-center'>Wrong Answers: " + incorrect + "</p>";
		var summaryUnansweredHTML = "<p class='summaryUnanswered text-center'>Unanswered: " + unanswered + "</p>";
		var resetButtonHTML = "<button class='resetButton btn btn-success btn-lg btn-block text-center' type='button'>PLAY AGAIN</button>";
		gameHTML = finishedText + summaryCorrectHTML + summaryWrongHTML + summaryUnansweredHTML + resetButtonHTML;
		$(".mainArea").html(gameHTML);
    }
    
    function resetGame() {
		questionCounter = 0;
		correct = 0;
		incorrect = 0;
		unanswered = 0;
		counter = 20;
		generateHTML();
		timer();
	}

	// Function that creates the start button and initial screen
	function initialScreen() {
		var initialText = "<p class='initialText text-center'>A quiz to test your knowledge of all things cheese!</p> <p class='initialText text-center'>There are 10 questions total and you will have 20 seconds to answer each one. Good luck!</p>";
		var startButtonHTML = "<button class='startButton btn btn-success btn-lg btn-block text-center' type='button'>Start Quiz</button>";
		startScreen = initialText + startButtonHTML;
		$(".mainArea").html(startScreen);
    }
     // BUTTON Functions:
        // will need seperate click event functions for startGame, answer, resetGame


    // When the start button is clicked:
	$("body").on("click", ".startButton", function(event){ 
		generateHTML();
		timer();
	});

	// When an answer is clicked:
	$("body").on("click", ".answer", function(event){
		selectedAnswer = $(this).attr("isCorrect");
		console.log(selectedAnswer);

		if (selectedAnswer === "true") { // evaluates if this is the correct answer
			clearInterval(clock);
		 	generateWin();
		} else { 	// then it's the wrong answer
			clearInterval(clock);
			generateLoss();
		}

	}); 

	// When the Play Again button is clicked:
	$("body").on("click", ".resetButton", function(event){
		resetGame();
	}); 

    initialScreen();
    
    
    
    console.log($("#cheese"))
    
   
});