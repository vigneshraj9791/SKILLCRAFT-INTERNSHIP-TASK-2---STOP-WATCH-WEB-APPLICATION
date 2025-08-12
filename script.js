let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const laps = document.getElementById('laps');

function updateDisplay() {
    let time = Date.now() - startTime + elapsedTime;
    let hours = Math.floor(time / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    
    display.textContent = 
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');
}

startStopBtn.addEventListener('click', function() {
    if (!isRunning) {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 1000);
        startStopBtn.textContent = 'Pause';
        isRunning = true;
    } else {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopBtn.textContent = 'Start';
        isRunning = false;
    }
});

lapBtn.addEventListener('click', function() {
    if (isRunning) {
        let lapTime = display.textContent;
        let li = document.createElement('li');
        li.textContent = lapTime;
        laps.appendChild(li);
    }
});

resetBtn.addEventListener('click', function() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    laps.innerHTML = '';
});
