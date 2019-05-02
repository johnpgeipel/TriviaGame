$(document).ready(function() {
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

     // WIN & LOSS Funcitons:
        // write functions for the outcomes of wins and losses
        // these will increase the win/loss counters by ++ with every guess, or timeout
        // these will also generate text to notify player if answer was correct/incorrect
        // these will also generate an image
        // these should also contain the setTimeOut for the pause between plays
        // there may have to be a seperate function for the timeout if player doesn't answer in time, thus adding to the unanswered count

    // TIMER Function:
        // write funciton for the timer
            // timer will need if/else for stopping, when player answers
            // timer will need reset or stop at loss
            // will need to generate text to html

    // BUTTON Functions:
        // will need seperate click event functions for startGame, answer, resetGame
});