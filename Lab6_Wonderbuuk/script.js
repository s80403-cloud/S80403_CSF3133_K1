// 1. Questions Array: Stores questions, options, and the correct answer
const questions = [
    {
        question: "Which HTML tag is used to embed JavaScript code inside an HTML document?",
        options: ["<javascript>", "<js>", "<script>", "<code>"],
        answer: "<script>"
    },
    {
        question: "Which JavaScript method is used to access an HTML element by its ID?",
        options: [
            "document.getElementById()",
            "document.querySelectorAll()",
            "document.getElementByClass()",
            "document.getElementByName()"
        ],
        answer: "document.getElementById()"
    },
    {
        question: "Which event is triggered when a user clicks on an HTML element?",
        options: ["onmouseover", "onchange", "onclick", "oncontextmenu"],
        answer: "onclick"
    },
    {
        question: "What does the Math.random() function return in JavaScript?",
        options: [
            "A random integer between 1 and 10",
            "A floating-point number between 0 (inclusive) and 1 (exclusive)",
            "The nearest integer rounded down",
            "A random boolean value"
        ],
        answer: "A floating-point number between 0 (inclusive) and 1 (exclusive)"
    },
    {
        question: "Where is client-side form validation executed?",
        options: [
            "On the database server",
            "In the user's web browser before submission",
            "On the web hosting server after submission",
            "Inside the CSS stylesheet"
        ],
        answer: "In the user's web browser before submission"
    }
];

// State variables
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;
let timerInterval = null;
const TIME_LIMIT = 15;
let timeLeft = TIME_LIMIT;

// DOM Elements
const startSection = document.getElementById("start-section");
const quizSection = document.getElementById("quiz-section");
const questionProgress = document.getElementById("question-progress");
const timerBox = document.getElementById("timer");
const timeLeftEl = document.getElementById("time-left");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackSection = document.getElementById("feedback-section");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score-display");
const restartBtn = document.getElementById("restart-btn");

// 2. Randomly shuffles the questions using Fisher-Yates algorithm
function shuffleQuestions() {
    shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
}

// 3. Sets a countdown timer for answering each question
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = TIME_LIMIT;
    timeLeftEl.innerText = timeLeft;
    timerBox.classList.remove("warning");

    timerInterval = setInterval(() => {
        timeLeft--;
        timeLeftEl.innerText = timeLeft;

        if (timeLeft <= 5) {
            timerBox.classList.add("warning");
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeOut();
        }
    }, 1000);
}

// Handles behavior when timer reaches 0
function handleTimeOut() {
    const currentQ = shuffledQuestions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll(".option-btn");

    optionButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.innerText === currentQ.answer) {
            btn.classList.add("correct");
        }
    });

    feedbackSection.innerText = `Time's up! The correct answer was: ${currentQ.answer}`;
    feedbackSection.className = "feedback incorrect";
    feedbackSection.classList.remove("hidden");

    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
}

// 4. Displays the current question and answer options
function displayQuestion() {
    selectedOption = null;
    submitBtn.disabled = true;
    submitBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");
    feedbackSection.classList.add("hidden");

    const currentQ = shuffledQuestions[currentQuestionIndex];
    questionProgress.innerText = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
    questionText.innerText = currentQ.question;

    // Clear previous options
    optionsContainer.innerHTML = "";

    currentQ.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.onclick = () => selectOption(button, option);
        optionsContainer.appendChild(button);
    });

    startTimer();
}

// Helper to highlight user's chosen option
function selectOption(buttonEl, optionText) {
    const allButtons = document.querySelectorAll(".option-btn");
    allButtons.forEach(btn => btn.classList.remove("selected"));

    buttonEl.classList.add("selected");
    selectedOption = optionText;
    submitBtn.disabled = false;
}

// 5. Checks whether the selected answer is correct and updates the score
function checkAnswer() {
    if (!selectedOption) return;

    clearInterval(timerInterval);
    const currentQ = shuffledQuestions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll(".option-btn");

    optionButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.innerText === currentQ.answer) {
            btn.classList.add("correct");
        } else if (btn.innerText === selectedOption && selectedOption !== currentQ.answer) {
            btn.classList.add("incorrect");
        }
    });

    if (selectedOption === currentQ.answer) {
        score++;
        feedbackSection.innerText = "Correct! Well done.";
        feedbackSection.className = "feedback correct";
    } else {
        feedbackSection.innerText = `Incorrect! The correct answer is: ${currentQ.answer}`;
        feedbackSection.className = "feedback incorrect";
    }

    feedbackSection.classList.remove("hidden");
    scoreDisplay.innerText = `Current Score: ${score} / ${shuffledQuestions.length}`;

    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
}

// 6. Moves to the next question, resetting the timer and updating the score
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuestions.length) {
        displayQuestion();
    } else {
        // End of Quiz
        clearInterval(timerInterval);
        quizSection.classList.add("hidden");
        scoreDisplay.innerText = `Quiz Completed! Final Score: ${score} / ${shuffledQuestions.length}`;
        restartBtn.classList.remove("hidden");
    }
}

// 7. Starts the quiz by shuffling questions, displaying the first question, and starting the timer
function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    shuffleQuestions();

    startSection.classList.add("hidden");
    restartBtn.classList.add("hidden");
    quizSection.classList.remove("hidden");

    scoreDisplay.innerText = `Current Score: 0 / ${shuffledQuestions.length}`;
    displayQuestion();
}