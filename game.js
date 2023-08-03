gamePattern = [];
userClickedPattern = [];
buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level =0;


$(".btn").on("click",function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour)
})


$(document).on("keydown",function(){
    if(!started){
        $("#level-title").text("Level: " + level) ;
        nextSequence();
        started = true;
    }
})



function nextSequence(){
    level++;
    $("#level-title").text("Level: " + level) ;
    var randomNumber = Math.random()*4;
    randomNumber = Math.floor(randomNumber);
    var randomChosenColor = buttonColours[randomNumber];

    gamePattern.push(randomChosenColor)


    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100)
}

function checkAnswer(currentLevel){
    
}