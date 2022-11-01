'use strict'

const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];
var count = 30;

// Question Array
var questions = [
    {
        question: 'Inside which HTML element do we embed the JavaScript file in?',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question:
            "What is the correct syntax when referring to an external script called 'game.js'?",
        choice1: "<script href='game.js'>",
        choice2: "<script name='game.js'>",
        choice3: "<script src='game.js'>",
        choice4: "<script file='game.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
    {
        question: "What is the question mark (?) used in JavaScript called?",
        choice1: "The Ternary Operator",
        choice2: "The Or Operator",
        choice3: "The And Operator",
        choice4: "The Not Operator",
        answer: 1,
    },
    {
        question: "What is an object in JavaScript?",
        choice1: "A named container that is assigned a singular, specific value",
        choice2: "A container used to hold multiple values of the same nature",
        choice3: "A container used to store multiple properties",
        choice4: "Used to execute a specific set of rules within ceratin parameters",
        answer: 3,
    },
    {
        question: "Which of these operators represent strict equality?",
        choice1: "!=",
        choice2: "===",
        choice3: "==",
        choice4: "!==",
        answer: 2,
    },
    {
        question: "How do we write the following expression: It is either breakfast or lunch or dinner and I'm hungry",
        choice1: "lunch || dinner && hungry",
        choice2: "!breakfast && lunch || dinner",
        choice3: "breaksfast || lunch || dinner &&!hungry",
        choice4: "breakfast || lunch || dinner && hungry",
        answer: 4,
    },
    {
        question: "How do we write exponentials in Javascript?",
        choice1: "+=",
        choice2: "*",
        choice3: "/",
        choice4: "**",
        answer: 4,
    },
    {
        question: "What is type coercion?",
        choice1: "When we manually convert one data type to another",
        choice2: "When your JavaScript becomes self aware and takes over your computer",
        choice3: "When we change one variable to another value locally",
        choice4: "When JavaScript automatically converts data types",
        answer: 4,
    },
    {
        question: "What does DRY stand for?",
        choice1: "Do not Repeat Yourself",
        choice2: "Decorate many Random Yachts",
        choice3: "Do Rain Cash on the Yokels",
        choice4: "Dumpster the Required Yield",
        answer: 1,
    },
];

// Constants
const correctBonus = 10
const maxQuestions = 7

function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    count = 20000;
    getNewQuestion();
};

function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('end.html');
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${maxQuestions}`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    var interval = setInterval(function () {
        document.getElementById('timer').innerText = count;
        count--;
        if (count <= 0) {
            clearInterval(interval);
            document.getElementById('timer').innerHTML = "Time's Up!";
        }

        if (count === 0) {
            return window.location.assign('end.html');
        }

    });

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (event) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = event.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        var classToApply = 'incorrect';
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct';
        }

        if (classToApply === 'correct') {
            updateScore(correctBonus);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);

        }, 1000);
        getNewQuestion();
        // updateTimer();

    });
});

function updateScore(num) {
    score += num;
    scoreText.innerText = score;
}

// function updateTimer() {
//     if (classToApply === 'correct') {
//         count = num + 5000;
//     } else {
//         count = num - 5000;
//     }
// }
startGame();
