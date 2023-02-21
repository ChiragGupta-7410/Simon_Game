var gameStart = false;

var gameOver = false;

var level = 0;

var gamePattern = [];

var userClickedPattern = [];

var buttonColor = ["green", "red", "yellow", "blue"];

var randomChosenColor;

function playSound(id) {
  var sound = new Audio("sounds/" + id + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#start-game").html("Level " + level);
  randomNumber =  Math.floor((Math.random() * 4));
  randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut().fadeIn();
  playSound(randomChosenColor);
}

function handleClick() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
}

function checkAnswer (currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern [currentLevel]) {
    console.log("success");
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout( function () {
        nextSequence();
      }, 1000);
    }
  }
  else {
    gameOver = true;
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over")
    }, 200);
    $("#start-game").html("Game Over, Press Any Key to Start Over");
  }
}

function handleKeyPress(ev) {
  if (!gameStart) {
    gameStart = true;
    $("#start-game").html("Level " + level);
    nextSequence();
  }
  else if (!gameOver && (ev.key === "ArrowUp" || ev.key === "ArrowRight" || ev.key === "ArrowLeft" || ev.key === "ArrowDown") ) {
    var userChosenColor = $("." + ev.key).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  }
  else if (gameOver) {
    gameOver = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    nextSequence();
  }
}

$(".btn").on("click", handleClick);

$(document).on("keydown", function (ev) {
  handleKeyPress(ev);
});
