let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keydown(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
});

// All that a BTN will do evetime we press it
$(".btn").click(function() {
   let userChosenColor = $(this).attr("id");
   userClickedPattern.push(userChosenColor);
   playSound(userChosenColor);
   animatePress(userChosenColor);
   checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  // checked if the most recent player answer match the game answer
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
   console.log("success");
   // if the player does have the right answer, we triggered nextSquence
   if (userClickedPattern.length === gamePattern.length) {
     setTimeout(function() {
       nextSequence();
     }, 1000);
   }
 } else {
   console.log("wrong");
   playSound("wrong");
   $("body").addClass("game-over");
   setTimeout(function(){
     $("body").removeClass("game-over");
   }, 200);
   $("#level-title").text("Game over, Press Any Key to Restart");
   startOver();
 }
}


function nextSequence() {
  // when nextSequence is triggered, reset p[layer array to empty
  userClickedPattern = [];
  // Increase level each time next Sequence is run and change text for user to see
  level++;
  $("#level-title").text("Level " + level);

  // Randomly choose a color
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  // Add a flashing effect
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// add shadow effect and change color of BTN container
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
