gamePattern = [];
userClickedPattern = [];
buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level =0;


//event listener for starting key (any key)
$(document).on("keydown",function(){
    if(!started){
        $("#level-title").text("Level: " + level) ;
        nextSequence();
        started = true;
    }
})


//event listener for button click
$(".btn").on("click",function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour)

    checkAnswer(userClickedPattern.length-1);
})


//set the new sequence
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level: " + level) ;
    var randomNumber = Math.random()*4;
    randomNumber = Math.floor(randomNumber);
    var randomChosenColor = buttonColours[randomNumber];

    gamePattern.push(randomChosenColor)


    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    

}

//play sound from ./sounds/ 
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


//add pressed class to the buttons when pressed  (100ms timeout)
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100)
}


//check if the user has been clicked the equal pattern with gamePattern
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
        
    }else{
        console.log("wrong");
        playSound("wrong")

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        
        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();

    }
}

//when game is over, reset counter and checker variables
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}