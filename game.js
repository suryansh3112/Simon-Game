
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red","blue","green","yellow"];

var start = false;
var level=0;

$(document).keydown(function(){
    if(!start)
    {
        $("#heading").text("LEVEL "+level);
        start=true;
        nextSequence();
    }
});

function nextSequence(){
    level++;
    userClickedPattern=[];
    $("#heading").text("LEVEL "+level);
    var randomnum = Math.floor(Math.random()*4);
    var randomchosencolor = buttonColors[randomnum];
    gamePattern.push(randomchosencolor);

    $("#" + randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
   
    playSound(randomchosencolor);

}

function checkAnswer(n){
    if(gamePattern[n]===userClickedPattern[n]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } 
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#heading").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }

}

function startOver(){
    gamePattern=[];
    level=0;
    start=false;
}

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animation(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animation(name){
    $("#"+name).addClass("pressed");
    setTimeout(function(){
        $("#"+name).removeClass("pressed");
    },100);
}

