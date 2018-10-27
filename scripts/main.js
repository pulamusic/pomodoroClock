$(document).ready(function() {
  const bellRing = "bellRing"
  const buttonClick = "buttonClick"
  let countClock = parseInt($("#session-length").html())
  let countBreak = parseInt($("#break-length").html())
  let timeLeftDefault = 0

  // Ion Sounds
  ion.sound({
    sounds: [
        {
            alias: bellRing,
            name: "bell_ring",
            path: "sounds/",
            volume: 0.7
        },
        {
            alias: buttonClick,
            name: "button_click_on",
            path: "sounds/",
            volume: 0.3
        }
    ],
    path: "sounds/",
    preload: true,
    multiplay: true
  })

  // function to play ion sounds
  function soundAlarm(alarm) {
  	ion.sound.play(alarm);
  }

  // hide timer-label onload
  $("#timer-label").hide()
  // hide reset button onload
  $("#reset").hide()

  // start/stop button for session timer
  $("#start_stop").on("click", function() {
    $("#start_stop").html("pause")
    const counterClock = setInterval(timer, 1000)
    // set clock to count minutes
    countClock *= 60;

    // NOTE TO SELF: This function is quite wonky. It doesn't play the sound files. Bummer dude.
    function timer() {
      // hide extra clock elements
      $("#session-decrement, #session-increment, .timer, .break").hide()
      // show timer-label
      $("#timer-label").show()
      // increase font size for time-left
      $("#time-left").addClass("bigger")
      // clock decrements
      countClock -= 1
      // when clock reaches zero
      if (countClock === 0) {
        // clear the counter
        clearInterval(counterClock)
        // Play bell audio
        soundAlarm(bellRing)
        // start breakTimer
        const startBreak = setInterval(breakTimer, 1000)
      }

      if (countClock % 60 >= 10) {
        $("#session-length").html(Math.floor(countClock / 60) + ":" + countClock % 60)
      } else {
        $("#session-length").html(Math.floor(countClock / 60) + ":" + "0" + countClock % 60)
      }
      return startBreak
    }

    function breakTimer() {
      const counterBreak = setInterval(breakTimer, 1000)
      // set break clock to count minutes
      countBreak *= 60;
      // decrement break timer
      countBreak -= 1

      if (countBreak === 0) {
        clearInterval(counterBreak)
        // Play bell audio
        soundAlarm(bellRing)

        // show session time snf break length
        $(".timer").show()
        $(".break").show()

        // show reset button
        $("#reset").show()
      }

      if (countBreak % 60 >= 10) {
        $("#break-length").html(Math.floor(countBreak / 60) + ":" + countBreak % 60)
      } else {
        $("#break-length").html(Math.floor(countBreak / 60) + ":" + "0" + countBreak % 60)
      }
    }
  })

  // reset button
  $("#reset").on("click", function() {

    // Play buttonClick audio
    soundAlarm(buttonClick)

    countClock = 25
    countBreak = 5

    $("#session-length").html(countClock)
    $("#break-length").html(countBreak)
    $("#time-left").html(timeLeftDefault)
  })

  // set decrement session time
  $("#session-decrement").on("click", function() {
    // Play buttonClick audio
    soundAlarm(buttonClick)

    if (countClock > 1) {
      countClock -= 1
      $("#session-length").html(countClock)
    }
  })

  // set increment session time
  $("#session-increment").on("click", function() {
    // Play buttonClick audio
    soundAlarm(buttonClick)

    if (countClock < 60) {
      countClock += 1
      $("#session-length").html(countClock)
    }
  })

  // set decrement break time
  $("#break-decrement").on("click", function() {
    // Play buttonClick audio
    soundAlarm(buttonClick)

    if (countBreak > 1) {
      countBreak -= 1
      $("#break-length").html(countBreak)
    }
  })

  // set increment break time
  $("#break-increment").on("click", function() {
    // Play buttonClick audio
    soundAlarm(buttonClick)

    if (countBreak < 60) {
      countBreak += 1
      $("#break-length").html(countBreak)
    }
  })
})
