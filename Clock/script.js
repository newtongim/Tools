function updateClocks() {
    const bangkokTime = new Date().toLocaleString("en-GB", {
        timeZone: "Asia/Bangkok",
        weekday: 'short', day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    });
    document.getElementById('bangkok-time').innerText = bangkokTime;

    const city = document.getElementById('city-select').value;
    const customTime = new Date().toLocaleString("en-GB", {
        timeZone: city,
        weekday: 'short', day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    });
    document.getElementById('custom-time').innerText = customTime;
}

setInterval(updateClocks, 1000);
updateClocks();

document.getElementById('city-select').addEventListener('change', updateClocks);

let timerInterval;
let isRunning = false;

function updatePomodoroTimer() {
    const timerElement = document.getElementById('pomodoro-timer');
    const workTime = parseInt(document.getElementById('work-time').value);
    const breakTime = parseInt(document.getElementById('break-time').value);
    const timeUnit = parseInt(document.getElementById('time-unit').value);

    let timeRemaining = workTime * timeUnit;
    let isWorkSession = true;

    timerElement.innerText = formatTime(timeRemaining);

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timeRemaining--;
            timerElement.innerText = formatTime(timeRemaining);

            if (timeRemaining <= 0) {
                isWorkSession = !isWorkSession;
                timeRemaining = (isWorkSession ? workTime : breakTime) * timeUnit;
            }
        }, 1000);
    }

    function togglePomodoro() {
        if (isRunning) {
            clearInterval(timerInterval);
            isRunning = false;
            document.getElementById('start-stop-btn').innerText = 'Start';
        } else {
            startTimer();
            isRunning = true;
            document.getElementById('start-stop-btn').innerText = 'Stop';
        }
    }

    document.getElementById('start-stop-btn').addEventListener('click', togglePomodoro);
}

document.getElementById('work-time').addEventListener('change', updatePomodoroTimer);
document.getElementById('break-time').addEventListener('change', updatePomodoroTimer);
document.getElementById('time-unit').addEventListener('change', updatePomodoroTimer);

updatePomodoroTimer();
