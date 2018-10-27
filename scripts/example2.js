$(document).ready( function() {

var taskCounter = 0;
var sessionTime = 25;
var breakTime = 5;
var timerType = "session";
var timerTime = sessionTime;
var sessionLineColor = '#6c6';
var breakLineColor = '#c66';
var counterID;
var isPaused = false;
var editingTime = false;
var sessionAlarm = "sessionAlarm";
var breakAlarm = "breakAlarm";
var clickSound = "clickSound";


ion.sound({
    sounds: [
        {
  					alias: clickSound,
            name: "button_click_on",
            volume: 0.3
        },
        {
						alias: sessionAlarm,
            name: "bell_ring",
            volume: 0.7
        },
				{
						alias: breakAlarm,
						name: "bell_ring",
						volume: 0.7
				}
    ],

    // main config
    path: "sounds/",
    preload: true,
    multiplay: true
});

//var sessionAlarm = new Audio('audio/temple_bell.mp3');
//var breakAlarm = new Audio('audio/caribbean.mp3');
//var clickSound = new Audio('audio/click.mp3');


var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var radius = 150;
var lineWidth = 18;
var lineColor = sessionLineColor;
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;



function decCounter() {
		var minutes = 0;
		var seconds = 0;

		taskCounter --;
		minutes = parseInt(taskCounter / 600);
		seconds = parseInt((taskCounter % 600) / 10);
		if (minutes < 10) {minutes = "0" + minutes;}
		if (seconds < 10) {seconds = "0" + seconds;}
		countTime = minutes + ":" + seconds;
		requestId = requestAnimationFrame(animateTimer);
}


function animateTimer() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  displayTimerArc();
  displayCount(countTime);

	var d = (0.25 - (1.5 * (taskCounter / (timerTime * 600))));
	ctx.lineWidth = lineWidth;
	ctx.strokeStyle = lineColor;
  ctx.lineCap = 'round';

  ctx.shadowColor = '#033';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0.75*Math.PI, d*Math.PI, false);
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}


function counter() {
  if(!isPaused) {
		if (taskCounter > 0) {
			decCounter();
		} else {
      if (timerType == 'session') {
        soundAlarm(sessionAlarm);
        setForBreak();
      } else {
        soundAlarm(breakAlarm);
        setForSession();
      }
      displayPauseIcon();
      displayCancelIcon('show');
		}
  }
}


function soundAlarm(alarm) {
  //alarm.addEventListener("canplay", alarm.play());
	ion.sound.play(alarm);
}


function displayTimerArc() {
  ctx.shadowColor = '#022';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  ctx.strokeStyle = '#699';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius +16, 0, 2*Math.PI, false);
  ctx.stroke();

  ctx.shadowBlur = 0;

  ctx.strokeStyle = '#699';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0.75*Math.PI, 0.25*Math.PI, false);
  ctx.stroke();
}


function displayTimers (state){
  var sessionMins = sessionTime;
	if (sessionMins < 10) {sessionMins = "0" + sessionMins;}
  var sessionDiv = document.getElementById('sessionTimeDiv');
  if (state == 'show') {sessionDiv.innerHTML = "<i id='setSessionTimeMinus' class='fs1 icon-minus'></i>&nbsp;&nbsp;<span>" + sessionMins + "</span>&nbsp;&nbsp;<i id='setSessionTimePlus' class='fs1 icon-plus'></i>";}
  if (state == 'hide') {sessionDiv.innerHTML = "";}

  var breakMins = breakTime;
  if (breakTime < 10) {breakMins = "0" + breakTime;}
  var breakDiv = document.getElementById('breakTimeDiv');
  if (state == 'show') {breakDiv.innerHTML = "<i id='setBreakTimeMinus' class='fs1 icon-minus'></i>&nbsp;&nbsp;<span>" + breakMins + "</span>&nbsp;&nbsp;<i id='setBreakTimePlus' class='fs1 icon-plus'></i>";}
  if (state == 'hide') {breakDiv.innerHTML = "";}
}


function displayCount(countTime) {
  ctx.fillStyle = "#add";
  ctx.font = "70px open sans, arial";
  ctx.shadowColor = '#011';
  ctx.shadowBlur = 5;
  ctx.fillText(countTime, centerX - 90, centerY);
}

function displayTimerType(state) {
  var typeDiv = document.getElementById('spacer');
  if (state == 'show') {typeDiv.innerHTML = "<span class='text-uppercase'>" + timerType + "</span>";}
  if (state == 'hide') {typeDiv.innerHTML = "";}
}

function displayClockIcon() {
  var setDiv = document.getElementById('setTimes');
    setDiv.innerHTML = "<i id='setTime' class='fs1 icon-clock'></i>";
}

function displayPlayIcon(state) {
  var playDiv = document.getElementById('play_pause');
  if (state == 'show') {playDiv.innerHTML = "<i id='playStart' class='fs2 icon-play2'></i>";}
  if (state == 'hide') {playDiv.innerHTML = "";}
}

function displayPlayResumeIcon() {
  var playDiv = document.getElementById('play_pause');
  playDiv.innerHTML = "<i id='playResume' class='fs2 icon-play2'></i>";
}

function displayPauseIcon() {
  var pauseDiv = document.getElementById('play_pause');
  pauseDiv.innerHTML = "<i id='pause' class='fs2 icon-pause'></i>";
}

function displayCancelIcon(state) {
  var cancelDiv = document.getElementById('cancel');
  if (state == 'show') {cancelDiv.innerHTML = "<i id='cancelTimer' class='fs2 icon-cancel-circle'></i>";}
  if (state == 'hide') {cancelDiv.innerHTML = "";}
}


function displayTimer(mins){
  var minutes = 0;
  var seconds = 0;
  var countTime = '';

  minutes = mins;
  taskCounter = (minutes * 600);
  if(minutes < 10) {minutes = "0" + minutes;}
  if(seconds < 10) {seconds = "0" + seconds;}
  countTime = minutes + ":" + seconds;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  displayTimerArc();
  displayCount(countTime);
  displayClockIcon();
  displayPlayIcon('show');
}


function setForSession() {
  timerType = 'session';
  isPaused = false;
  editingTime = false;
  timerTime = sessionTime;
  lineColor = sessionLineColor;
  alarm = sessionAlarm;
  displayTimer(timerTime);
  displayTimerType('show');
}


function setForBreak() {
  timerType = 'break';
  isPaused = false;
  editingTime = false;
  timerTime = breakTime;
  lineColor = breakLineColor;
  alarm = breakAlarm;
  displayTimer(timerTime);
  displayTimerType('show');
}


// ------- control code --------------------

setForSession();

$("#setTimes").on('click', '#setTime', function(){
  //clickSound.play();
	ion.sound.play(clickSound);
  if (editingTime) {
      displayTimers('hide');
      setForSession();
    } else {
        editingTime = true;
        if (counterID !== undefined) {clearInterval(counterID);}
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        displayTimerArc();
        displayCancelIcon('hide');
        displayPlayIcon('hide');
        displayTimerType('hide');
        displayTimers('show');
    }
});

$("#play_pause").on('click', '#playStart', function(){
  //clickSound.play();
	ion.sound.play(clickSound);
  isPaused = false;
  displayPauseIcon();
  displayCancelIcon('show');
  counterID = setInterval(counter, 100);
});

$("#play_pause").on('click', '#playResume', function(){
  //clickSound.play();
	ion.sound.play(clickSound);
  isPaused = false;
  displayPauseIcon();
});

$("#play_pause").on('click', '#pause', function(){
  //clickSound.play();
	ion.sound.play(clickSound);
  isPaused = true;
  displayPlayResumeIcon();
});

$("#cancel").on('click', '#cancelTimer', function(){
  //clickSound.play();
	ion.sound.play(clickSound);
  clearInterval(counterID);
  displayCancelIcon('hide');
  setForSession();
});

$("#sessionTimeDiv").on('click', '#setSessionTimePlus', function(){
  //clickSound.play();
	ion.sound.play(clickSound);
  sessionTime ++;
  if (sessionTime > 99) {sessionTime = 99;}
  displayTimers('show');
});

$("#sessionTimeDiv").on('click', '#setSessionTimeMinus', function(){
  //clickSound.play();
	ion.sound.play(clickSound);
  sessionTime --;
  if (sessionTime < 1) {sessionTime = 1;}
  displayTimers('show');
});

$("#breakTimeDiv").on('click', '#setBreakTimePlus', function(){
  //clickSound.play();
	ion.sound.play(clickSound);
  breakTime ++;
  if (breakTime > 99) {breakTime = 99;}
  displayTimers('show');
});

$("#breakTimeDiv").on('click', '#setBreakTimeMinus', function(){
  //clickSound.play();
	ion.sound.play(clickSound);
  breakTime --;
  if (breakTime < 1) {breakTime = 1;}
  displayTimers('show');
});


});
