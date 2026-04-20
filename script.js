document.addEventListener('DOMContentLoaded', () => {

    let gameMode = "normal";
    let lives = 1;
    let timePerQuestion = 15;
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const hardcoreBtn = document.getElementById('hardcore-btn');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');

    const questionText = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');
    const scoreDisplay = document.getElementById('score-display');


    let questions = [
        { question: "хто топ 1 керри?", answers: ["phantom lancer", "spectre", "antimage", "clincz"], correct: 0 },
        { question: "хто контр пік пла?", answers: ["sven", "earth shaker", "anti mage", "нема контр піків"], correct: 3 },
        { question: "Топ 1 шмотка на пуджа", answers: ["mask of madness", "aether lense", "aganim scepter", "boots of travel"], correct: 0 },
        { question: "ТОП 1 аркана", answers: ["на шейкера", "на спектру", "на течіса", "на рубіка"], correct: 0 },
        { question: "скільки ролей в доті?", answers: ["3", "5", "7", "Я не граю"], correct: 1 },
        { question: "який рецепт яєць найсмачніший?", answers: ["пашот", "омлет", "варене", "скрамбл"], correct: 0 },
        
        { question: "Продовжи: Шукав мідь...", answers: ["знайшов золото", "67", "знайшов діаманти", "Згорів ведмідь"], correct: 3 },
        { question: "топ патч в доті", answers: ["7.41", "7.42", "хз", "7.40"], correct: 0 },
        { question: "2+2=", answers: ["5", "-1", "4", "error"], correct: 0 },
        { question: "2+2*2=", answers: ["3", "8", "6", "67"], correct: 2 },
        
        
    ];

    let questionIndex = 0;
    let score = 0;
    let interval = null;
function startGame(mode = "normal") {
    gameMode = mode;

    startScreen.classList.add('hide');
    resultScreen.classList.add('hide');
    quizScreen.classList.remove('hide');

    score = 0;
    questionIndex = 0;

    if (gameMode === "hardcore") {
        lives = 1;
        timePerQuestion = 5;
    } else {
        timePerQuestion = 15;
    }

    showQuestion(questions[questionIndex]);
}

    function showQuestion(question) {

        if (interval) clearInterval(interval);


        answersContainer.innerHTML = "";
        questionText.textContent = question.question;


        for (let i = 0; i < question.answers.length; i++) {
            const button = document.createElement("button");
            button.textContent = question.answers[i];
            button.classList.add("answer-btn");
            button.addEventListener("click", () => checkAnswer(button, i));
            answersContainer.appendChild(button);
        }

        startTimer();
    }

function checkAnswer(button, answersIndex) {
    const answerButtons = document.querySelectorAll('#answers-container button');

    if (answersIndex === questions[questionIndex].correct) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('wrong');

        if (gameMode === "hardcore") {
            lives--;
            if (lives <= 0) {
                clearInterval(interval);
                setTimeout(showResult, 1000);
                return;
            }
        }
    }

    scoreDisplay.textContent = 'Бали: ' + score;

    answerButtons.forEach(btn => btn.disabled = true);

    clearInterval(interval);
    setTimeout(nextQuestion, 1000);
}
function startTimer() {
    let timeLeft = timePerQuestion;
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = `Час: ${timeLeft}`;

    interval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Час: ${timeLeft}`;

        if (timeLeft <= 0) {
            clearInterval(interval);

            if (gameMode === "hardcore") {
                showResult(); // 💀 програв одразу
            } else {
                nextQuestion();
            }
        }
    }, 1000);
}

    function nextQuestion() {
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }


function showResult() {
    quizScreen.classList.add('hide');
    resultScreen.classList.remove('hide');

    const accuracy = Math.round((score / questions.length) * 100);
    const resultText = document.getElementById('result-text');

    let message = "";

    if (score > 5) {
        message = "харош 😎";
    } else {
        message = "плаке плаке 😢";
    }

    resultText.textContent = `Твій результат: ${score} з ${questions.length} (${accuracy}%) — ${message}`;
}
startBtn.addEventListener('click', () => startGame("normal"));
hardcoreBtn.addEventListener('click', () => startGame("hardcore"));
restartBtn.addEventListener('click', () => startGame(gameMode));















            
});





