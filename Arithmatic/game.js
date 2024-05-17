// game.js

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start');
    const difficultyDiv = document.getElementById('difficulty');
    const gameDiv = document.getElementById('game');
    const numbersP = document.getElementById('numbers');
    const answerInput = document.getElementById('answer');
    const resultP = document.getElementById('result');
    const correctSpan = document.getElementById('correct');
    const incorrectSpan = document.getElementById('incorrect');
    const timeSpan = document.getElementById('time');
    const levelSelect = document.getElementById('level');

    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let timeLeft = 60;
    let num1, num2;
    let digitLevel = 1;

    startButton.addEventListener('click', startGame);

    function startGame() {
        digitLevel = parseInt(levelSelect.value);
        difficultyDiv.style.display = 'none';
        gameDiv.style.display = 'block';
        correctAnswers = 0;
        incorrectAnswers = 0;
        timeLeft = 60;
        correctSpan.textContent = correctAnswers;
        incorrectSpan.textContent = incorrectAnswers;
        timeSpan.textContent = timeLeft;
        generateNumbers();
        const timer = setInterval(() => {
            timeLeft--;
            timeSpan.textContent = timeLeft;
            if (timeLeft === 0) {
                clearInterval(timer);
                endGame();
            }
        }, 1000);
    }

    function generateNumbers() {
        const max = Math.pow(10, digitLevel) - 1;
        num1 = Math.floor(Math.random() * (max + 1));
        num2 = Math.floor(Math.random() * (max + 1));
        numbersP.textContent = `${num1} + ${num2}`;
        answerInput.value = '';
        resultP.textContent = '';
    }

    answerInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });

    function checkAnswer() {
        const userAnswer = parseInt(answerInput.value);
        if (userAnswer === num1 + num2) {
            correctAnswers++;
            correctSpan.textContent = correctAnswers;
            resultP.textContent = 'Correct!';
            resultP.style.color = 'green';
        } else {
            incorrectAnswers++;
            incorrectSpan.textContent = incorrectAnswers;
            resultP.textContent = 'Wrong!';
            resultP.style.color = 'red';
        }
        generateNumbers();
    }

    function endGame() {
        gameDiv.style.display = 'none';
        difficultyDiv.style.display = 'block';
        alert(`Game over! Your final score is ${correctAnswers} correct and ${incorrectAnswers} incorrect answers.`);
    }
});
