const questionText = document.getElementById("question-text");
const optionsDiv = document.getElementById("options");
const timerDisplay = document.getElementById("time");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("current-score"); // Get the score display element

const category = localStorage.getItem("quizCategory");
const difficulty = localStorage.getItem("quizDifficulty");
let score = parseInt(localStorage.getItem("quizScore")) || 0;

let currentQuestionIndex = 0;
let questions = [];
let timer;

async function fetchQuestions() {
    const url = `https://opentdb.com/api.php?amount=20&category=${category}&difficulty=${difficulty}&type=multiple`;
    const response = await fetch(url);
    const data = await response.json();
    questions = data.results;
    displayQuestion();
}

function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        localStorage.setItem("quizScore", score);
        window.location.href = "end.html";
        return;
    }

    const questionData = questions[currentQuestionIndex];
    questionText.innerHTML = questionData.question;

    optionsDiv.innerHTML = "";
    let answers = [...questionData.incorrect_answers, questionData.correct_answer];
    answers = answers.sort(() => Math.random() - 0.5);

    answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.innerHTML = answer;
        btn.onclick = () => checkAnswer(answer, questionData.correct_answer);
        optionsDiv.appendChild(btn);
    });

    updateScore(); // Update score before starting the timer
    startTimer(questionData.correct_answer);
}

function startTimer(correctAnswer) {
    let timeLeft = 15;
    let progress = 0; // Track progress
    timerDisplay.innerText = timeLeft;
    progressBar.style.width = `0%`; // Reset progress bar
    clearInterval(timer);

    timer = setInterval(() => {
        timeLeft--;
        progress = ((15 - timeLeft) / 15) * 100; // Calculate progress percentage
        timerDisplay.innerText = timeLeft;
        progressBar.style.width = `${progress}%`; // Update progress bar width

        if (timeLeft <= 0) {
            clearInterval(timer);
            showCorrectAnswer(correctAnswer);
        }
    }, 1000);
}

function checkAnswer(selected, correct) {
    clearInterval(timer);
    if (selected === correct) {
        score++;
        feedback.innerHTML = "✅ Correct!";
    } else {
        feedback.innerHTML = `❌ Wrong! Correct answer: ${correct}`;
    }

    updateScore(); // Update score after checking the answer

    setTimeout(() => {
        currentQuestionIndex++;
        feedback.innerHTML = "";
        displayQuestion();
    }, 2000);
}

function showCorrectAnswer(correct) {
    feedback.innerHTML = `⌛ Time Up! Correct answer: ${correct}`;
    
    updateScore(); // Update score even when the time is up

    setTimeout(() => {
        currentQuestionIndex++;
        feedback.innerHTML = "";
        displayQuestion();
    }, 2000);
}

function updateScore() {
    scoreDisplay.innerText = score; // Update the displayed score
}

let progressBar = document.getElementById("progress-bar");

function startTimer(correctAnswer) {
    let timeLeft = 15;
    let progress = 0; // Track progress
    timerDisplay.innerText = timeLeft;
    progressBar.style.width = `0%`; // Reset progress bar
    clearInterval(timer);

    timer = setInterval(() => {
        timeLeft--;
        progress = ((15 - timeLeft) / 15) * 100; // Calculate progress percentage
        timerDisplay.innerText = timeLeft;
        progressBar.style.width = `${progress}%`; // Update progress bar width

        if (timeLeft <= 0) {
            clearInterval(timer);
            showCorrectAnswer(correctAnswer);
        }
    }, 1000);
}

fetchQuestions();
