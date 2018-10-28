$(document).ready(function() {
  const bellRing = document.getElementById("beep")
  const doorBell = document.getElementById("beep")
  const buttonClick = document.getElementById("click")
  let countSession = parseInt($("#session-length").html())
  let countBreak = parseInt($("#break-length").html())
  let timeLeft = parseInt($("#time-left").html())
  let pauseResume
  let startSession
  let startBreak

  // *************AUDIO FUNCTIONS***************
  function playBell() {
    bellRing.pause()
    bellRing.currentTime = 0
    bellRing.play()
  }

  function playDoor() {
    doorBell.pause()
    doorBell.currentTime = 0
    doorBell.play()
  }

  function playClick() {
    buttonClick.pause()
    buttonClick.currentTime = 0
    buttonClick.play()
  }

  // *****************************

  // hide timer-label onload
  $("#timer-label").hide()

  // **************START/STOP BUTTON AND FUNCTIONS*********************
  $("#start_stop").on("click", function() {
    // show #timer-label and hide .timer and .break
    $(".timer, .break").hide()
    $("#timer-label").show()

    // change start button to pause
    if ($("#start_stop").html() === "start") {
      // switch button text to pause
      $("#start_stop").html("pause")
    } else if ($("#start_stop").html() === "pause") {
      pause()
      // switch button text to resume
      $("#start_stop").html("resume")
    } else if ($("#start_stop").html() === "resume") {
      resume()
      // switch button text back to pause
      $("#start_stop").html("pause")
    }
    // NOTE: Pause and resume functions below

    // *********************START TIMER & CONVERT MILISECONDS TO SECONDS****************
    startSession = setInterval(timer, 1000)

    countSession *= 60
    countBreak *= 60

    // *********LOCAL TIMER AND BREAKTIME FUNCTIONS************
    function timer() {
      // decrement session time
      countSession -= 1
      // change message to session
      $("#timer-message").html("session")
      // display countSession in #time-left
      $("#time-left").html(countSession)

      if (countSession === 0) {
        playBell()
        clearInterval(startSession)
        startBreak = setInterval(breakTime, 1000)
      }

      // format number output
      if (countSession % 60 >= 10) {
        $("#time-left").html(Math.floor(countSession / 60) + ":" + countSession % 60)
      } else {
        $("#time-left").html(Math.floor(countSession / 60) + ":" + "0" + countSession % 60)
      }

      // NOTE: This function is within the scope of the timer function. Does it need to be?
      function breakTime() {
        // decrement clock
        countBreak -= 1
        // change message to break
        $("#timer-message").html("break")
        // display countBreak in #time-left
        $("#time-left").html(countBreak)

        if (countBreak === 0) {
          playBell()
          clearInterval(startBreak)
        }

        // format number output
        if (countBreak % 60 >= 10) {
          $("#time-left").html(Math.floor(countBreak / 60) + ":" + countBreak % 60)
        } else {
          $("#time-left").html(Math.floor(countBreak / 60) + ":" + "0" + countBreak % 60)
        }
      }
      // re-start timer
      timer()
    }

  }) // end of #start_stop

  // *****************PAUSE AND RESUME FUNCTIONS*******************
  function pause(){
    if(countSession > 0){
      pauseResume = countSession
      clearInterval(countSession)
    } else if (countBreak > 0) {
      pauseResume = countBreak
      clearInterval(countBreak)
    }
  }

  function resume(){
    if (pauseResume = countSession) {
      countSession = pauseResume;
      countSession = setInterval(timer, 1000);
    } else if (pauseResume = countBreak) {
      countBreak = pauseResume;
      countBreak = setInterval(timer, 1000);
    }
  }

  // *************RESET BUTTON******************
  $("#reset").on("click", function() {
    // reset values to default
    countSession = 25
    countBreak = 5
    timeLeft = 0
    $("#session-length").html(countSession)
    $("#break-length").html(countBreak)
    $("#time-left").html(timeLeft)

    // stop and zero out the audio files
    bellRing.pause()
    bellRing.currentTime = 0
    doorBell.pause()
    doorBell.currentTime = 0

    // hide #timer-label and show .timer and .break
    $(".timer, .break").show()
    $("#timer-label").hide()

    // clear any remaining countdown
    clearInterval(startSession)
    clearInterval(startBreak)
  })

  // *************DECREMENT AND INCREMENT BUTTONS*************
  // set decrement session time
  $("#session-decrement").on("click", function() {
    // Play buttonClick audio
    playClick()
    if (countSession > 1) {
      countSession -= 1
      $("#session-length").html(countSession)
    }
  })

  // set increment session time
  $("#session-increment").on("click", function() {
    // Play buttonClick audio
    playClick()
    if (countSession < 60) {
      countSession += 1
      $("#session-length").html(countSession)
    }
  })

  // set decrement break time
  $("#break-decrement").on("click", function() {
    // Play buttonClick audio
    playClick()
    if (countBreak > 1) {
      countBreak -= 1
      $("#break-length").html(countBreak)
    }
  })

  // set increment break time
  $("#break-increment").on("click", function() {
    // Play buttonClick audio
    playClick()
    if (countBreak < 60) {
      countBreak += 1
      $("#break-length").html(countBreak)
    }
  })

}) // end of document ready
