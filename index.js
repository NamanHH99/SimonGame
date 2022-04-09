var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern =[];
var gamePattern = [];
var level = 0;
var started = false;
function new_sequence(){
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChoosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChoosenColour);
  var temp = $("." + randomChoosenColour);
  $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColour);
  level++;
  userClickedPattern =[];
}
$(".btn").on("click",function(event){
  // var userChoosenColour = event.target.id;
  var userChoosenColour = $(this).attr("id");
  userClickedPattern.push(userChoosenColour);
  playSound(userChoosenColour);
  animatePress(userChoosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
function playSound(name){
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}
function animatePress(currentColour){
  // $("#" + currentColour).addClass("pressed").delay(100).removeClass("pressed");
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("correct");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        new_sequence();
      }, 1000);
    }

  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
    console.log("wrong");
  }
}
$(document).on("keydown",function(){
  if(!started){
    new_sequence();
    started = true;
  }
});
function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}
