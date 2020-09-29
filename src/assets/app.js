const elTime = document.querySelector("#time");
const inputMinutes = document.getElementById("minutes");
const inputSeconds = document.getElementById("seconds");
const btnStart = document.getElementById("btnStart");
const btnAbort = document.getElementById("btnAbort");
let interval;

if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

function setTimer() {
    let minutes = parseInt(inputMinutes.value);
    let seconds = parseInt(inputSeconds.value);

    if (isNaN(seconds) || isNaN(minutes) || (minutes == 0 && seconds == 0)) {
        return alert("Please set time");
    }

    if (minutes < 0 || seconds < 0) {
        return alert("Values must be positive");
    }

    if (interval) {
        return alert("Timer already running");
    }

    inputMinutes.value = null;
    inputSeconds.value = null;

    btnStart.style.display = "none";
    btnAbort.style.display = "block";
    document.getElementById("inputs").style.display = "none";

    updateText(minutes, seconds);

    interval = setInterval(() => {
        updateText(minutes, seconds);
        if (minutes > 0) {
            if (seconds == 0) {
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
        } else {
            if (seconds == 0) {
                alarm();
            } else {
                seconds--;
            }
        }
    }, 1000);
}

function abort() {
    clearInterval(interval);
    interval = 0;
    updateText(0, 0);

    btnStart.style.display = "block";
    inputMinutes.value = 0;
    inputSeconds.value = 0;
    btnAbort.style.display = "none";
    document.getElementById("inputs").style.display = "block";
}

function updateText(m, s) {
    elTime.innerHTML = `${m}:${s < 10 ? "0" + s : s}`;
}

function alarm() {
    abort();
    new Notification("tea.timer alarm!");
}
