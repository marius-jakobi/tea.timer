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
    let minutes = isNaN(parseInt(inputMinutes.value)) ? 0 : parseInt(inputMinutes.value);
    let seconds = minutes > 0 ? 0 : parseInt(inputSeconds.value);

    if (isNaN(seconds)) {
        return alert("Please set time");
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
