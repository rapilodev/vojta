var clockTimer = null;
var totalTimer = null;
var round = 0;

const setRound = (value) => {
    round = value;
    document.getElementById("round").innerHTML = "Runde " + round;
};

const showClock = (id, minute, second) => {
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    document.getElementById(id).innerHTML = minute + ":" + second;
};

const clear = (timer) => {
    if (timer) {
        clearInterval(timer);
    }
    return null;
};

const startClock = (id, timer) => {
    const start = Date.now() / 1000;
    timer = clear(timer);
    return setInterval(() => {
        const diff = (Date.now() / 1000) - start;
        showClock(id, Math.floor(diff / 60), Math.floor(diff % 60));
    }, 1000);
};

const restartClock = (id, timer) => {
    timer = clear(timer);
    showClock(id, 0, 0);
    return startClock(id, timer);
};

document.addEventListener("DOMContentLoaded", () => {
    showClock("clock", 0, 0);
    setRound(1);

    document.getElementById("total").addEventListener("click", () => {
        totalTimer = restartClock("total", totalTimer);
        clockTimer = restartClock("clock", clockTimer);
        setRound(1);
    });

    document.getElementById("round").addEventListener("click", () => {
        setRound(round + 1);
        clockTimer = restartClock("clock", clockTimer);
    });

    document.getElementById("clock").addEventListener("click", () => {
        clockTimer = restartClock("clock", clockTimer);
        if (!totalTimer) totalTimer = restartClock("total", totalTimer);
    });
});

