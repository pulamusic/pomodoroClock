$(document).ready(function() {
  const bellRing = document.getElementById("beep")
  const buttonClick = document.getElementById("click")
  let countSession = parseInt($("#session-length").html())
  let countBreak = parseInt($("#break-length").html())
  let timeLeftDefault = 0

  // audio functions
  function playBell() {
    bellRing.pause()
    bellRing.currentTime = 0
    bellRing.play()
  }

  function playClick() {
    buttonClick.pause()
    buttonClick.currentTime = 0
    buttonClick.play()
  }

  // hide timer-label onload
  $("#timer-label").hide()

  // start/stop button for session timer
  $("#start_stop").on("click", function() {
    playClick()

    if ($("#start_stop").html() === "start") {
      // stop the timer CODE HERE
      $("#start_stop").html("pause")
    } else {
      // start the timer CODE HERE
      $("#start_stop").html("start")
    }

    const counterClock = setInterval(timer, 1000)
    // set clock to count minutes
    countSession *= 60;

    // NOTE TO SELF: This function is quite wonky. It doesn't play the sound files. Bummer dude.
    function timer() {
      // hide extra clock elements
      $(".timer, .break").hide()
      // show timer-label
      $("#timer-label").show()

      // show session time in #timer-label element
      $("#time-left").html(countSession)

      // clock decrements
      countSession -= 1

      if (countSession % 60 >= 10) {
        $("#time-left").html(Math.floor(countSession / 60) + ":" + countSession % 60)
      } else {
        $("#time-left").html(Math.floor(countSession / 60) + ":" + "0" + countSession % 60)
      }

      // when clock reaches zero
      if (countSession === 0) {
        // clear the counter
        clearInterval(counterClock)
        // play bell audio
        playBell()

        breakTimer()
      }
      // setInterval(breakTimer, 1000)
      // breakTimer()
    }

    function breakTimer() {
      const counterClock = setInterval(breakTimer, 1000)
      // set break clock to count minutes
      countBreak *= 60;
      // decrement break timer
      countBreak -= 1

      if (countBreak % 60 >= 10) {
        $("#time-left").html(Math.floor(countBreak / 60) + ":" + countBreak % 60)
      } else {
        $("#time-left").html(Math.floor(countBreak / 60) + ":" + "0" + countBreak % 60)
      }

      if (countBreak === 0) {
        clearInterval(counterClock)
        // Play bell audio
        playBell()

        timer()

        // // show session time snf break length
        // $(".timer").show()
        // $(".break").show()
        //
        // // show reset button
        // $("#reset").show()
      }


      // timer()
    }
  })

  // BUTTONS OTHER THAN START/PAUSE
  // reset button
  $("#reset").on("click", function() {
    // Play buttonClick audio and stop bellRing
    playClick()
    bellRing.pause()
    bellRing.currentTime = 0

    countSession = 25
    countBreak = 5

    $("#session-length").html(countSession)
    $("#break-length").html(countBreak)
    $("#time-left").html(timeLeftDefault)
  })

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
})
