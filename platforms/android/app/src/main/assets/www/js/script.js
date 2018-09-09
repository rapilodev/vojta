var clockTimer = null;
var totalTimer = null;
var round = 0;

function setRound(value) {
	round = value;
	var roundElem = document.getElementById("round")
	roundElem.innerHTML = "Runde " + round;
}

function showClock(id, minute, second) {
	if (minute < 10)
		minute = "0" + minute;
	if (second < 10)
		second = "0" + second;
	var clockElem = document.getElementById(id);
	clockElem.innerHTML = minute + ":" + second;
}

function clear(timer) {
	if (timer == null)
		return;
	console.log(timer)
	clearInterval(timer);
	timer = null;
}

function startClock(id, timer) {
	var date = new Date();
	var start = date.getTime() / 1000;

	clear(timer);
	timer = setInterval(function() {
		var now = new Date().getTime() / 1000;
		var diff = now - start;

		var minute = parseInt(diff / 60);
		var second = parseInt(diff % 60);
		showClock(id, minute, second);
	}, 1000);
	return timer
}

function restartClock(id, timer) {
	clear(timer);
	showClock(id, 0, 0);
	timer = startClock(id, timer);
	return timer;
}

$(document).ready(function() {
	showClock("clock", 0, 0);
	setRound(1);

	$("#total").click(function() {
		totalTimer = restartClock("total", totalTimer)
		clockTimer = restartClock("clock", clockTimer);
		setRound(1);
	});

	$("#round").click(function() {
		setRound(round + 1);
		clockTimer = restartClock("clock", clockTimer);
	});

	$("#clock").click(function() {
		clockTimer = restartClock("clock", clockTimer);
	});
})
