const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = document.getElementById('mostRecentScore');
finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', function () {
    saveScoreBtn.disabled = !username.value;
});

function saveHighScore(event) {
    event.preventDefault();
};