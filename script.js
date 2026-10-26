const guessInput      = document.getElementById('guessInput');
const guessBtn        = document.getElementById('guessBtn');
const resetBtn        = document.getElementById('resetBtn');
const feedback        = document.getElementById('feedback');
const attemptsDisplay = document.getElementById('attemptsDisplay');
const trialInfo       = document.getElementById('trialInfo');

let secret, attempts, wrongTrialsLeft;
const MAX_TRIALS = 3;

function resetGame() {
    secret          = Math.floor(Math.random() * 100) + 1;
    attempts        = 0;
    wrongTrialsLeft = MAX_TRIALS;

    attemptsDisplay.textContent = '0';
    trialInfo.textContent       = `Trials left: ${MAX_TRIALS}`;
    feedback.textContent        = "🎯 I'm thinking of a number between 1 and 100.";
    feedback.className          = 'feedback';
    guessInput.value            = '';
    guessInput.disabled         = false;
    guessBtn.disabled           = false;
    guessInput.focus();
}

function handleGuess() {
    const guess = parseInt(guessInput.value, 10);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        feedback.textContent = '⚠️ Enter a number between 1 and 100.';
        feedback.className   = 'feedback';
        return;
    }

    attempts++;
    attemptsDisplay.textContent = attempts;

    if (guess < secret) {
        feedback.textContent = '📈 Too low!';
        feedback.className   = 'feedback low';
        wrongTrialsLeft--;
    } else if (guess > secret) {
        feedback.textContent = '📉 Too high!';
        feedback.className   = 'feedback high';
        wrongTrialsLeft--;
    } else {
        feedback.textContent = `🎉 Correct! You got it in ${attempts} tries.`;
        feedback.className   = 'feedback win';
        endGame();
        return;
    }

    if (wrongTrialsLeft <= 0) {
        feedback.textContent = `❌ Out of trials! The number was ${secret}.`;
        feedback.className   = 'feedback lose';
        trialInfo.textContent = 'Trials left: 0';
        endGame();
    } else {
        trialInfo.textContent = `Trials left: ${wrongTrialsLeft}`;
    }

    guessInput.value = '';
    guessInput.focus();
}

function endGame() {
    guessInput.disabled = true;
    guessBtn.disabled   = true;
}

guessBtn.addEventListener('click', handleGuess);
guessInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleGuess();
});
resetBtn.addEventListener('click', resetGame);

// Start
resetGame();