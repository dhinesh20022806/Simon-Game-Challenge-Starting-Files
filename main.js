var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var started = false;

//3. At the top of the game.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern = [];
var level = 0;

//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
 $(".btn").click(function () {

      //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
      //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
      if(!started){
        $('h1').text('press a key first to start');
        console.log(started + 'if started');
      }
      else{
        console.log(started + 'else started');
        const userChosenColour = $(this).attr("id");
      userClickedPattern.push(userChosenColour);
      animatePressed(userChosenColour);
      playSound(userChosenColour);
      checkAnswer(userClickedPattern.length - 1);
      }
    });

$(document).on("keypress", () => {
  if (!started) {
    nextSequence();
    started = true;
  }
});

const playSound = function (name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

const animatePressed = (currentColor) => {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => $("#" + currentColor).removeClass("pressed"), 100);
};

const checkAnswer = function (currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => nextSequence(), 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    started = false;
    gamePattern = [];
    level = 0;
  }
};

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").text("Level  " + level);
}
