
const timerDisplay = document.querySelector('.time');
const startBtn = document.querySelector('.start-btn');
const restartBtn = document.querySelector('.control-btn:nth-of-type(1)');
const nextBtn = document.querySelector('.control-btn:nth-of-type(2)');
const progressDots = document.querySelectorAll('.progress-indicator .dot');
const sessionType = document.querySelector('h2');

const dots = document.querySelectorAll('.dot');
const lastDot = dots[dots.length - 1];

let timer;
let timeLeft;
let currentSession = 0;
let isRunning = false;
let isFocusSession = true;
const focusDuration = 25 * 60; // 25 minutes for focus session
const breakDuration = 5 * 60; // 5 minutes for break session
const longBreakDuration = 30 * 60; // 30 minutes for the final break session

// Initialize timer
function initializeTimer() {
    if (currentSession === progressDots.length) {
        timeLeft = longBreakDuration;
        sessionType.textContent = 'Long Break';
    } else {
        timeLeft = isFocusSession ? focusDuration : breakDuration;
        sessionType.textContent = isFocusSession ? 'Focus session' : 'Break session';
    }
    updateTimer();
}

// Timer function
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    if (timeLeft === 0) {
        clearInterval(timer);
        handleSessionEnd();
    } else {
        timeLeft--;
    }
}

// Handle session end
function handleSessionEnd() {
    isRunning = false;
    startBtn.textContent = 'Start ';
    
    if (isFocusSession && currentSession < progressDots.length) {
        progressDots[currentSession].classList.add('active');
        currentSession++;
    }

    if (currentSession === progressDots.length) {
        if (!isFocusSession) {
            alert('Great job! You completed all sessions including the final long break!');
            resetTimer();
            return;
        }
    }

    // Toggle session type (Focus ↔ Break)
    isFocusSession = !isFocusSession;
    initializeTimer();
}

// Start/Pause button functionality
startBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        startBtn.textContent = 'Start ';
    } else {
        timer = setInterval(updateTimer, 1000);
        startBtn.textContent = 'Pause ';
    }
    isRunning = !isRunning;
});

// Restart button functionality
restartBtn.addEventListener('click', () => {
    resetTimer();
});

// Reset timer function
function resetTimer() {
    clearInterval(timer);
    currentSession = 0;  // Reset session count
    isFocusSession = true; // Start with Focus session
    initializeTimer();
    isRunning = false;
    startBtn.textContent = 'Start ';
    // Reset progress dots
    progressDots.forEach(dot => dot.classList.remove('active'));
}

// Initialize timer display
initializeTimer();








