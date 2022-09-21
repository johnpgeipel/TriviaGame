$(document).ready(function() {
    var startScreen;
	var gameHTML;
	var correct = 0;
	var incorrect = 0;
	var unanswered = 0;
	var questionCounter = 0;
	var counter = 20;
	var clock;
    // var selecterAnswer;
 
    var questionArray = [
        { 	
            question: 'What was the first name-controlled ("A.O.C.") cheese?',
            answers: [
                {text: "Camembert", isCorrect: false},
                {text: "Roquefort", isCorrect: true},
                {text: "Chabrin", isCorrect: false},
                {text: "Epoisses", isCorrect: false}
            ]
        },
        { 	
            question: "What makes Casu Marzu distinct?",
            answers: [
                {text: "It's made from yak milk.", isCorrect: false},
                {text: "It's the most expensive cheese in the world.", isCorrect: false},
                {text: "It's washed in pickle juice.", isCorrect: false},
                {text: "It contains maggots.", isCorrect: true}
            ]
        },
        { 	
            question: "Which cheese is so stinky it's been banned from public transportation?",
            answers: [
                {text: "Epoisses", isCorrect: true},
                {text: "Stinking Bishop", isCorrect: false},
                {text: "Taleggio", isCorrect: false},
                {text: "Greyson", isCorrect: false}
            ]
        },
        { 	
            question: "What was Charles de Galle's favorite cheese?",
            answers: [
                {text: "Pont l'Eveque", isCorrect: false},
                {text: "Mimolette", isCorrect: true},
                {text: "Brie", isCorrect: false},
                {text: "Perail", isCorrect: false}
            ]
        },
        { 	
            question: "Which American cheese has won 3 best in show awards from the American Cheese Society?",
            answers: [
                {text: "Cypress Grove Humboldt Fog", isCorrect: false},
                {text: "Jasper HIll Harbison", isCorrect: false},
                {text: "Upland Creamery Pleasant Ridge Reserve", isCorrect: true},
                {text: "Kraft Singles", isCorrect: false}
            ]
        },
        { 	
            question: "Which cheese is traditionally formed in a bra?",
            answers: [
                {text: "Sbrinz", isCorrect: false},
                {text: "Pouligny-Saint-Pierre", isCorrect: false},
                {text: "Tetilla", isCorrect: true},
                {text: "Bra Duro", isCorrect: false}
            ]
        },
        { 	
            question: "Where does rennet come from?",
            answers: [
                {text: "The dark side of the moon", isCorrect: false},
                {text: "The Upside Down", isCorrect: false},
                {text: "A bottle", isCorrect: false},
                {text: "The stomach of an innocent calf", isCorrect: true}
            ]
        },
        { 	
            question: "What are the principal ingredients of cheese?",
            answers: [
                {text: "Milk, starter culture, rennet, salt", isCorrect: true},
                {text: "Milk, water, salt, citric acid", isCorrect: false},
                {text: "Milk, lactic acid, rennet, calcium chloride", isCorrect: false},
                {text: "Milk, salt, tyrosine, vinegar", isCorrect: false}
            ]
        },
        { 	
            question: "Where is cheddar originally from?",
            answers: [
                {text: "New York", isCorrect: false},
                {text: "England", isCorrect: true},
                {text: "Vermont", isCorrect: false},
                {text: "Wisconsin, Baby!", isCorrect: false}
            ]
        },
        { 	
            question: "Where is Colby originally from?",
            answers: [
                {text: "Minnesota", isCorrect: false},
                {text: "New York", isCorrect: false},
                {text: "Denmark", isCorrect: false},
                {text: "Wisconsin, Baby!", isCorrect: true}
            ]
        },
    ];

    var answerArray = ["Roquefort", "It contains maggots.", "Epoisses", "Mimolette", "Upland Creamery Pleasant Ridge Reserve", "Tetilla", "The stomach of an innocent calf", "Milk, starter culture, rennet, salt", "England", "Wisconsin, Baby!"];

    var wittyReply = ["You're a wheel cheese wiz!", "Whey to go!", "You're the Brie's knees!", "Grate job!", "Too Gouda to be true!", "Curd is the word!", "Looking sharp!", "Gouda catch 'em all!", "Couldn't Havarti said it better!", "Gruyere the best!"];   
    
    function generateHTML() {
        var timeRemainingText = "<p class='animated fadeInLeft timerText text-center'>Time Remaining : <span id='timer'>20</span></p>";
        var questionText = "<p class='animated fadeInLeft questionText text-center'>" + questionArray[questionCounter].question + "</p>";
        gameHTML = timeRemainingText + questionText;
        $(".mainArea").html(gameHTML);
        for (var i = 0; i < questionArray[questionCounter].answers.length; i++) {
            var answerButton = $("<button>");
            answerButton.addClass("animated fadeInUp answer btn btn-block text-center");
            answerButton.attr("isCorrect", questionArray[questionCounter].answers[i].isCorrect);
            answerButton.html(questionArray[questionCounter].answers[i].text);
            $(".mainArea").append(answerButton);
        }
    };
     
    function generateWin() {
        correct++;
        wittyReply.push(wittyReply.shift());
        var correctAnswerText = "<p class='animated fadeInUp correctText text-center'><strong>Correct!</strong><br>" + wittyReply[0] + "<br></p>";
        
        var imgHTML = "<img class='center-block imgCorrect' src=''>";
        gameHTML = correctAnswerText + imgHTML;
        $(".mainArea").html(gameHTML);
        setTimeout(nextDisplay, 3000); 
    };

    function generateLoss() {
        incorrect++;
        var wrongAnswerText = "<p class='animated fadeInUp wrongText text-center'><strong>Incorrect</strong><br>The correct answer is :<br>" + answerArray[0] + "<br></p>";
        var imgHTML = "<img class='center-block imgWrong' src=''>";
        gameHTML = wrongAnswerText + imgHTML;
        $(".mainArea").html(gameHTML);
        setTimeout(nextDisplay, 3000); 
    };
    function generateLossAtTimeOut() {
		unanswered++;
		var timeOutText = "<p class='animated fadeInUp timeOutText text-center'><strong>Time's up!</strong><br>The correct answer is :<br>" + answerArray[0] + "<br></p>";
		var imgHTML = "<img class='center-block imgWrong' src=''>";
		gameHTML =  timeOutText + imgHTML;
		$(".mainArea").html(gameHTML);
        setTimeout(nextDisplay, 3000);
        displayAnswer();
        console.log(answerArray)
	};

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
    };

    function nextDisplay() {
		if (questionCounter < questionArray.length - 1) {
			questionCounter++;
			generateHTML();
			counter = 20;
			timer();
		} else {
			finalScreen();
        }
    };
    
    function finalScreen() {
		var finishedText = "<p class='animated fadeInRight delay-1s finishedText text-center'>Here's how you did!</p>";
		var summaryCorrectHTML = "<p class='animated fadeInRight delay-2s summaryCorrect text-center'>Correct Answers: " + correct + "</p>";
		var summaryWrongHTML = "<p class='animated fadeInRight delay-2s summaryWrong text-center'>Wrong Answers: " + incorrect + "</p>";
		var summaryUnansweredHTML = "<p class='animated fadeInRight delay-2s summaryUnanswered text-center'>Unanswered: " + unanswered + "</p>";
		var resetButtonHTML = "<button class='animated fadeInUp delay-2s resetButton btn btn-success btn-lg btn-block text-center' type='button'>Play Again</button>";
		gameHTML = finishedText + summaryCorrectHTML + summaryWrongHTML + summaryUnansweredHTML + resetButtonHTML;
		$(".mainArea").html(gameHTML);
    };
    
    function resetGame() {
		questionCounter = 0;
		correct = 0;
		incorrect = 0;
		unanswered = 0;
		counter = 20;
		generateHTML();
		timer();
	};

	function initialScreen() {
		var initialText = "<p class='initialText text-center'>A quiz to test your knowledge of all things cheese!</p> <p class='initialText text-center'>There are 10 questions total and you will have 20 seconds to answer each one. Good luck!</p>";
		var startButtonHTML = "<button class='startButton btn btn-success btn-lg btn-block text-center' type='button'>Start Quiz</button>";
		startScreen = initialText + startButtonHTML;
		$(".mainArea").html(startScreen);
    };
     
    function displayAnswer() {
        var correctText = "<p class='animated fadeInUp delay-1s correctText text-center'>The correct answer is: " + answerArray[0] + "</p>";
        answerArray.push(answerArray.shift());
        console.log(answerArray)
    };

	$("body").on("click", ".startButton", function(event){ 
		generateHTML();
		timer();
	});

	$("body").on("click", ".answer", function(event){
        selectedAnswer = $(this).attr("isCorrect");

		if (selectedAnswer === "true") { 
            clearInterval(clock);
             generateWin();
             displayAnswer();
		} else { 
			clearInterval(clock);
            generateLoss();
            displayAnswer();
		};
	}); 
    
	$("body").on("click", ".resetButton", function(event){
        resetGame();
	}); 

    initialScreen();
});