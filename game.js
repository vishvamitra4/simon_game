let gamePatterns = [];
let userClickedPattern = [];

const buttonColors = ["red", "blue", "green", "yellow"];


///// checking whether game has started or not...

let started = false;
let level = 0;
$(document).on("keydown", start);

$(".btn1 button").on("click" , function()
{
  if (started == false) {
    nextSequence();
    started = true;
    $(this).text("Quit").css("background-color" , "red").css("border" , "1px solid red");
  }
  else{
    quit();
    $(this).text("Start").css("background-color" , "green").css("border" , "1px solid green");
  };
})

function start()
{
  if (started == false) {
    nextSequence();
    started = true;
    $(".btn1 button").text("Quit").css("background-color" , "red").css("border" , "1px solid red");
  };
};

//////// it will call new sequence.....
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level : " + level);
  let randomNumber = Math.floor(Math.random() * 4);

  gamePatterns.push(buttonColors[randomNumber]);


  $("#" + buttonColors[randomNumber]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(buttonColors[randomNumber]);



};



//////// eventlistener for clicking the buttons....

$(".btn").on("click", function() {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  answer_check(userClickedPattern.length - 1);

})



///////checking for the answer...
function answer_check(currlevel) {
  if (userClickedPattern[currlevel] === gamePatterns[currlevel]) {
    if (userClickedPattern.length === gamePatterns.length) {
      $(".sc").text("Your Score : " +gamePatterns.length );
      setTimeout(function() {
        nextSequence()
      }, 800);
    };
  } else {

    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("😒😒😒😒😒"+ "Press A Key to Start");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $(".btn1 button").text("Start").css("background-color" , "green").css("border" , "1px solid green");

    game_start_again();
  };


}

///////// playing sound for keys....
function playSound(name) {
  switch (name) {
    case "green":
      var aud = new Audio('sounds/green.mp3');
      aud.play();
      break;
    case "blue":
      var aud = new Audio('sounds/blue.mp3');
      aud.play();
      break;
    case "red":
      var aud = new Audio('sounds/red.mp3');
      aud.play();
      break;
    case "yellow":
      var aud = new Audio('sounds/yellow.mp3');
      aud.play();
      break;
    case "wrong":
      var aud = new Audio('sounds/wrong.mp3');
      aud.play();
      break;

  };
};

//////// animation for clicked function............
function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
};

function game_start_again() {
  started = false;
  gamePatterns = [];
  level = 0;
  userClickedPattern = [];
}

function quit()
{

  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Quit! Press A Key To Start");

  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  game_start_again();
}
