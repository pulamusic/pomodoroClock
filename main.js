$(document).ready(function() {
  const gong = $("audio#gong")[0]
  let countClock = parseInt($("#num-clock").html())
  let countBreak = parseInt($("#num-break").html())

  // hide audio element
  $(".audio").hide()

  // hide reset button onload
  $("#reset-clock").hide()

  // start button for session timer
  $("#start-btn").on("click", function() {
    const counter = setInterval(timer, 1000)
    countClock *= 60;

    // NOTE TO SELF: This function is quite wonky. It doesn't count down to zero, and it doesn't play the sound file. Bummer dude.
    function timer() {
      // hide extra clock elements
      $("#start-btn, #subtract-1-clock, #add-1-clock, .break").hide()

      // increase font size for clock
      $("#num-clock").addClass("bigger")

      // clock decrements
      countClock -= 1

      // when clock reaches zero
      if (countClock === 0) {
        // clear the counter
        clearInterval(counter)
        // play the sound file
        gong.get(0).play()

        // decrease font size for clock
        $("#num-clock").removeClass("bigger")

        // start breakTimer
        const startBreak = setInterval(breakTimer, 1000)
      }

      if (countClock % 60 >= 10) {
        $("#num-clock").html(Math.floor(countClock / 60) + ":" + countClock % 60)
      } else {
        $("#num-clock").html(Math.floor(countClock / 60) + ":" + "0" + countClock % 60)
      }
    }

    function breakTimer() {
      // hide session time
      $(".timer").hide()

      // show the break timer
      $(".break").show()

      // increase font size for break timer
      $("#num-break").addClass("bigger")

      // decrement break timer
      countBreak -= 1

      if (countBreak === 0) {
        clearInterval(startBreak)
        gong.get(0).play()
        // decrease font size for break timer
        $("#num-break").removeClass("bigger")
        // show session time
        $(".timer").hide()
        // show reset button
        $("#reset-clock").show()
      }

      if (countBreak % 60 >= 10) {
        $("#num-break").html(Math.floor(countBreak / 60) + ":" + countBreak % 60)
      } else {
        $("#num-break").html(Math.floor(countBreak / 60) + ":" + "0" + countBreak % 60)
      }
    }
  })

  // reset button
  $("#reset-clock").on("click", function() {
    countClock = 25
    countBreak = 5

    $("#num-clock").html(countClock)
    $("#num-break").html(countBreak)
  })

  // set decrement session time
  $("#subtract-1-clock").on("click", function() {
    if (countClock > 1) {
      countClock -= 1
      $("#num-clock").html(countClock)
    }
  })

  // set increment session time
  $("#add-1-clock").on("click", function() {
    if (countClock < 120) {
      countClock += 1
      $("#num-clock").html(countClock)
    }
  })

  // set decrement break time
  $("#subtract-1-break").on("click", function() {
    if (countBreak > 1) {
      countBreak -= 1
      $("#num-break").html(countBreak)
    }
  })

  // set increment break time
  $("#add-1-break").on("click", function() {
    if (countBreak < 30) {
      countBreak += 1
      $("#num-break").html(countBreak)
    }
  })


})
