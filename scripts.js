let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let streak = 0;
let maxStreak = 0;
let answeredQuestions = 0;


const TIME_LIMIT = 15;
let timeLeft = TIME_LIMIT;
let timerInterval;
let isTimerEnabled = false;

const verifiedIconSVG = `
    <svg class="icon" title="Verified Question" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#34a853" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>`;

const notVerifiedIconSVG = `
    <svg class="icon" title="Not verified. Help the community by contributing!" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ea4335" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>`;

const aiIconSVG = `
    <svg class="icon" title="AI generated or suggested" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4285f4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="4" y="7" width="16" height="10" rx="2" ry="2" />
        <circle cx="9" cy="12" r="1" />
        <circle cx="15" cy="12" r="1" />
        <line x1="12" y1="2" x2="12" y2="7" />
        <line x1="8" y1="2" x2="16" y2="2" />
    </svg>`;


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        shuffleArray(data.questions);
        questions = data.questions;
        return true;
    } catch (error) {
        console.error('Error loading questions:', error);
        questions = [
            {
                "question": "This is a fallback question. Where is the 'questions.json' file?",
                "answers": ["In the same folder as index.html", "In the 'js' folder", "In the 'css' folder", "It's not needed"],
                "correct": 0,
                "explanation": "The 'questions.json' file should be in the same directory as the 'index.html' file to be loaded correctly by the fetch API.",
                "verified": true
            }
        ];
        return false;
    }
}

async function startGame() {
    isTimerEnabled = document.getElementById('timerToggle').checked;

    document.getElementById('startScreen').classList.remove('active');
    document.getElementById('gameScreen').classList.add('active');

    const timerContainer = document.getElementById('timerContainer');
    if (isTimerEnabled) {
        timerContainer.classList.remove('hidden');
    } else {
        timerContainer.classList.add('hidden');
    }

    updateProgressBar();

    await loadQuestions();
    loadQuestion();
}

function loadQuestion() {
    if (isTimerEnabled) {
        clearInterval(timerInterval);
        timeLeft = TIME_LIMIT;
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.textContent = timeLeft;
            timerElement.classList.remove('timer-urgent');
        }
        timerInterval = setInterval(updateTimer, 1000);
    }

    const question = questions[currentQuestionIndex];
    document.getElementById('questionNumber').textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;

    const iconContainer = document.getElementById('verification-icon-container');
    iconContainer.innerHTML = '';
    if (question.verified === true) {
        iconContainer.innerHTML += `
            <span title="Verified. Trusted source.">
                ${verifiedIconSVG}
            </span>`;
    } else {
        iconContainer.innerHTML += `
            <span title="Not verified. Help the community by contributing!">
                ${notVerifiedIconSVG}
            </span>`;
    }

    if (question.ai_generated === true) {
        iconContainer.innerHTML += `
            <span title="AI generated or suggested">
                ${aiIconSVG}
            </span>`;
    }

    const answersGrid = document.getElementById('answersGrid');
    answersGrid.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        const letter = String.fromCharCode(65 + index); // A, B, C, D
        button.textContent = `${letter}. ${answer}`;
        button.onclick = () => selectAnswer(index);
        answersGrid.appendChild(button);
    });

    document.getElementById('explanation').classList.remove('show');
    document.getElementById('nextBtn').classList.remove('show');
}

function updateTimer() {
    timeLeft--;
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = timeLeft;
        if (timeLeft <= 5) {
            timerElement.classList.add('timer-urgent');
        }
        if (timeLeft <= 0) {
            selectAnswer(-1); // Time's up!
        }
    } else {
        clearInterval(timerInterval);
    }
}

function selectAnswer(selectedIndex) {
    if (isTimerEnabled) {
        clearInterval(timerInterval);
    }

    const question = questions[currentQuestionIndex];
    const buttons = document.querySelectorAll('.answer-btn');
    const isCorrect = selectedIndex === question.correct;

    buttons.forEach((btn, index) => {
        btn.disabled = true;
        btn.classList.add('disabled');

        if (index === question.correct) {
            btn.classList.add('correct');
        }
        else if (index === selectedIndex) {
            btn.classList.add('incorrect');
        }
    });

    if (!isCorrect) {
        const explanationText = selectedIndex === -1
            ? `<p class="timer-urgent">Time's up!</p>${question.explanation}`
            : question.explanation;
        document.getElementById('explanationText').innerHTML = explanationText;
        document.getElementById('explanation').classList.add('show');
    }

    if (isCorrect) {
        score += 10;
        streak++;
        if (streak > maxStreak) maxStreak = streak;
    } else {
        streak = 0;
    }

    answeredQuestions++;
    updateScore();
    updateProgressBar();

    document.getElementById('nextBtn').classList.add('show');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function updateScore() {
    document.getElementById('currentScore').textContent = score;
    document.getElementById('streak').textContent = streak;
}

function updateProgressBar() {
    const progress = questions.length > 0 ? (answeredQuestions / questions.length) * 100 : 0;
    document.getElementById('progressBar').style.width = progress + '%';
}

function showResults() {
    document.getElementById('gameScreen').classList.remove('active');
    document.getElementById('resultsScreen').classList.add('active');

    const percentage = questions.length > 0 ? (score / (questions.length * 10)) * 100 : 0;
    document.getElementById('finalScore').textContent = `${score}/${questions.length * 10}`;

    let message, messageClass;
    if (percentage >= 80) {
        message = "🌟 Excellent! You're well-prepared for your Data Engineering exam!";
        messageClass = "excellent";
    } else if (percentage >= 60) {
        message = "👍 Good job! A bit more practice and you'll be ready!";
        messageClass = "good";
    } else {
        message = "📚 Keep studying! Focus on the areas where you missed questions.";
        messageClass = "needs-improvement";
    }

    const performanceDiv = document.getElementById('performanceMessage');
    performanceDiv.textContent = message;
    performanceDiv.className = `performance-message ${messageClass}`;
}

function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    streak = 0;
    maxStreak = 0;
    answeredQuestions = 0;
    isTimerEnabled = false;
    clearInterval(timerInterval);

    document.getElementById('resultsScreen').classList.remove('active');
    document.getElementById('startScreen').classList.add('active');
    document.getElementById('timerContainer').classList.add('hidden');

    updateScore();
}
