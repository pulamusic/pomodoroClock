$(document).ready(function() {
  const bellRing = document.getElementById("beep")
  const buttonClick = document.getElementById("click")
  let countSession = parseInt($("#session-length").html())
  let countBreak = parseInt($("#break-length").html())
  let timeLeftDefault = 0
  let pause = false

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

  // START/STOP BUTTON FOR SESSION TIMER
  $("#start_stop").on("click", function(event) {
    playClick()
    event.preventDefault()
    const counter = setInterval(timer, 1000)

    if ($("#start_stop").html() === "start") {
      // start the timer CODE GOES HERE


      $("#start_stop").html("pause")
    } else {
      // stop the timer CODE HERE


      $("#start_stop").html("start")
    }

    // // set clock function
    // let counterClock = setInterval(timer, 1000)

    // set clock to count minutes
    countSession *= 60;

    // Session timer
    function timer() {
      // hide extra clock elements
      $(".timer, .break").hide()
      // show timer-label
      $("#timer-label").show()

      counter = countSession

      // show session time in #timer-label element
      $("#time-left").html(counter)

      // clock decrements
      counter -= 1

      if (counter % 60 >= 10) {
        $("#time-left").html(Math.floor(counter / 60) + ":" + counter % 60)
      } else {
        $("#time-left").html(Math.floor(counter / 60) + ":" + "0" + counter % 60)
      }

      // when clock reaches zero
      if (counter === 0) {
        // clear the counter
        clearInterval(counter)
        // play bell audio
        playBell()
        // start break timer
        // breakTime()
      }

      // counterClock = setInterval(timer, 1000)

      function breakTime() {
        // switch to break time
        countBreak *= 60

        $("#time-left").html(countBreak)

        // clock decrements again
        countBreak -= 1

        if (countBreak % 60 >= 10) {
          $("#time-left").html(Math.floor(countBreak / 60) + ":" + countBreak % 60)
        } else {
          $("#time-left").html(Math.floor(countBreak / 60) + ":" + "0" + countBreak % 60)
        }

        // when clock reaches zero
        if (countBreak === 0) {
          // clear the counter
          clearInterval(counter)
          // play bell audio
          playBell()
          // start session timer
          // timer()
        }
      }
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
