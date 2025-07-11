let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let streak = 0;
let maxStreak = 0;
let answeredQuestions = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Load questions from JSON file
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
        return false;
    }
}

async function startGame() {
    // Show loading message
    document.getElementById('startScreen').innerHTML = '<div class="start-screen"><h2>Loading questions...</h2></div>';
    
    // Load questions
    const loaded = await loadQuestions();
    if (!loaded) {
        document.getElementById('startScreen').innerHTML = '<div class="start-screen"><h2>⚠️ Could not load questions.json</h2><p>Using fallback questions instead.</p><button class="start-btn" onclick="continueGame()">Continue with Basic Questions</button></div>';
        return;
    }
    
    continueGame();
}

function continueGame() {
    document.getElementById('startScreen').classList.remove('active');
    document.getElementById('gameScreen').classList.add('active');
    loadQuestion();
}

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('questionNumber').textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    
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
    
    // Hide explanation and next button for new question
    document.getElementById('explanation').classList.remove('show');
    document.getElementById('nextBtn').classList.remove('show');
    updateProgressBar();
}

function selectAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    const buttons = document.querySelectorAll('.answer-btn');
    
    // Loop through all buttons to disable them and apply styling
    buttons.forEach((btn, index) => {
        // Programmatically disable the button to prevent further clicks
        btn.disabled = true;
        
        // Add styling to show the button is disabled
        btn.classList.add('disabled'); 
        
        // Highlight the correct answer in green
        if (index === question.correct) {
            btn.classList.add('correct');
        } 
        // If the user's choice was incorrect, highlight it in red
        else if (index === selectedIndex) {
            btn.classList.add('incorrect');
        }
    });
    
    // Show explanation only for wrong answers
    if (selectedIndex !== question.correct) {
        document.getElementById('explanationText').innerHTML = question.explanation;
        document.getElementById('explanation').classList.add('show');
    }
    
    // Update score based on the correct answer
    if (selectedIndex === question.correct) {
        score += 10;
        streak++;
        if (streak > maxStreak) maxStreak = streak;
    } else {
        streak = 0;
    }
    
    answeredQuestions++;
    updateScore();

    // Show the button to advance to the next question
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
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function showResults() {
    document.getElementById('gameScreen').classList.remove('active');
    document.getElementById('resultsScreen').classList.add('active');
    
    const percentage = (score / (questions.length * 10)) * 100;
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
    
    document.getElementById('resultsScreen').classList.remove('active');
    document.getElementById('startScreen').classList.add('active');
    
    updateScore();
}