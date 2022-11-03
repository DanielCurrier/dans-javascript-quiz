var username = document.getElementById('username');
var saveScoreBtn = document.getElementById('saveScoreBtn');
var finalScore = document.getElementById('finalScore');
var mostRecentScore = localStorage.getItem('mostRecentScore');

const maxHighScores = 5;

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
console.log(highScores);
finalScore.innerText = mostRecentScore;

username.addEventListener('keydown', function () {
    saveScoreBtn.disabled = !username.value;
});

function saveHighScore(event) {
    console.log('Save button clicked!')
    event.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };

    console.log(score.name);


    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
};



