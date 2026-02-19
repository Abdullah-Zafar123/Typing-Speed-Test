let startButton = document.getElementById('start-btn');
let userInput = document.getElementById('user-input');
let textToType = document.getElementById('text-to-type').textContent;
let timeElement = document.getElementById('time');
let wpmElement = document.getElementById('wpm');
let accuracyElement = document.getElementById('accuracy');

let timer = 0;
let timerInterval;
let isTestRunning = false;
let totalTypedChars = 0;
let correctChars = 0;

function startTest() {
    if (isTestRunning) return;
    isTestRunning = true;
    totalTypedChars = 0;
    correctChars = 0;
    userInput.value = '';
    userInput.disabled = false;
    userInput.focus();
    startButton.disabled = true;
    timer = 0;

    timerInterval = setInterval(() => {
        timer++;
        timeElement.textContent = timer;
    }, 1000);

    userInput.addEventListener('input', updateTest);
}

function updateTest() {
    let typedText = userInput.value;
    totalTypedChars = typedText.length;
    correctChars = 0;

    for (let i = 0; i < totalTypedChars; i++) {
        if (typedText[i] === textToType[i]) {
            correctChars++;
        }
    }

    let accuracy = ((correctChars / totalTypedChars) * 100).toFixed(2);
    accuracyElement.textContent = accuracy;

    let wpm = ((totalTypedChars / 5) / (timer / 60)).toFixed(2);
    wpmElement.textContent = wpm;

    if (typedText === textToType) {
        clearInterval(timerInterval);
        userInput.disabled = true;
        startButton.disabled = false;
        alert('Test completed! Your result is: WPM: ' + wpm + ' Accuracy: ' + accuracy + '%');
    }
}

startButton.addEventListener('click', startTest);
