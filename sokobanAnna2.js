"use strict";

//Hide what we don't need at the start
$("#winButton").hide();
$("#loseButton").hide();
$("#winStatement").hide();
$("#counter").show();
$("#winContainer").hide();
$("#container").text("");


//function that starts the game - it is called via onclick in HTML
function start() {
    createBoard();
    timer();
}

//Create a timer
function timer() {
    var counter = 30;
    var interval = setInterval(function() {
        counter--;
        // if counter is smaller/equal zero and the player hasn't finished the three levels, the following is displayed:
        if (counter <= 0 && playerWin != true) {
            clearInterval(interval);
            $("#winContainer").show();
            $("#winContainer").html("Time is up");
            $("#container").hide();
            $("#timer").hide();
            $("#level").hide();
            return;
        }else{
            $('#timer').text(counter + " seconds");
        }
    }, 1000);
}

//create levels
let matrix = [
    [
        ["W", "W", "W", "W", "W", "W", "W", "W"],
        ["W", "E", "E", "E", "E", "E", "E", "W"],
        ["W", "E", "E", "E", "E", "E", "W", "W"],
        ["W", "E", "E", "E", "E", "E", "E", "W"],
        ["W", "E", "E", "E", "E", "E", "E", "W"],
        ["W", "W", "W", "W", "W", "W", "W", "W"]
    ],
    [
        ["W", "W", "W", "W", "W", "W", "W", "W"],
        ["W", "E", "E", "E", "W", "E", "W", "W"],
        ["W", "E", "E", "E", "E", "E", "E", "W"],
        ["W", "W", "E", "E", "E", "E", "E", "W"],
        ["W", "W", "E", "E", "E", "E", "E", "W"],
        ["W", "W", "W", "W", "W", "W", "W", "W"]
    ],
    [
        ["W", "W", "W", "W", "W", "W", "W", "W"],
        ["W", "E", "E", "W", "W", "E", "W", "W"],
        ["W", "E", "E", "E", "E", "E", "E", "W"],
        ["W", "W", "E", "E", "E", "E", "E", "W"],
        ["W", "W", "E", "E", "E", "E", "E", "W"],
        ["W", "W", "W", "W", "W", "W", "W", "W"]
    ],


];

var level = 0; //will be used "matrix[level]" as index for the different levels in matrix. After win, it will be increased by 1.
var printLevel = 1; //the printLevel that is displayed on page is always higher than level by 1. After win, it will also be increased by 1.

//Positions of player, boxes, and goals are defined here:
var currentPosition = [[1, 3],[1, 5],[2, 5]]; //player position
var boxPositions = [[[2, 3], [2, 5]],[[3, 3], [3, 4]], [[3, 4], [3, 5]]]; //box positions
var winPositions = [[[2, 2], [2, 4]],[[2, 2], [2, 4]] ,[[2, 3], [2, 4]]]; //goal positions
var playerWin = false;


//CREATE BOARD
function createBoard() {
    $("#level").text("Level " + printLevel);
    $("#loseButton").show(); //this button calls the replay function which starts a new game
    $("#startGame").hide(); //hide start button
    //Now the program loops through the level to create divs for each element and depending on what it is, give it the right image
    for (var i = 0; i < matrix[level].length; i++) {
        for (var j = 0; j < matrix[level][i].length; j++) {
            if (matrix[level][i][j]=="W"){
                var board = document.createElement("div");
                $(board).css({
                    "width": "100px",
                    "height": "100px",
                    "position": "absolute",
                    "left": j * 100 + "px",
                    "top": i * 100 + "px",
                    "background-image": "url(images/wall.png)",
                    "background-size": "contain"
                });
                $(board).text(""); //To remove the W from the board
                $(board).appendTo($("#container"));
            }
            if(matrix[level][i][j]=="E"){
                var board = document.createElement("div");
                $(board).css({
                    "width": "100px",
                    "height": "100px",
                    "position": "absolute",
                    "left": j * 100 + "px",
                    "top": i * 100 + "px",
                    "background-image": "url(images/empty.png)",
                    "background-size": "contain"
                });
                $(board).text(""); //To remove the E from the board
                $(board).appendTo($("#container"));
            }
        }
    }
    //Now loop through the winPositions to create and display them
    for (var i = 0; i < winPositions[level].length; i++ ) {
        var board = document.createElement("div");
        $(board).css({
            "width": "100px",
            "height": "100px",
            "position": "absolute",
            "left": winPositions[level][i][1] * 100 + "px",
            "top": winPositions[level][i][0] * 100 + "px",
            "background-image": "url(images/destination.png)",
            "background-size": "contain"
        });
        $(board).appendTo($("#container"));
    }
    //Now loop through the boxPositions to create and display them
    for (var i = 0; i < boxPositions[level].length; i++ ){
        var board = document.createElement("div");
        $(board).css({
            "width": "100px",
            "height": "100px",
            "position": "absolute",
            "left": boxPositions[level][i][1] * 100 + "px",
            "top": boxPositions[level][i][0] * 100 + "px",
            "background-image": "url(images/box.png)",
            "background-size": "cover"
        });
        $(board).appendTo($("#container"));
    }
    //Now create player
        var board = document.createElement("div");
        $(board).css({
            "width": "100px",
            "height": "100px",
            "position": "absolute",
            "left": currentPosition[level][1] * 100 + "px",
            "top": currentPosition[level][0] * 100 + "px",
            "background-image": "url(images/player.png)",
            "background-size": "cover"
        });
        $(board).appendTo($("#container"));

}


//RESET FUNCTION
function reset() {
    $(".boardElement").remove();
}



//MOVING MECHANICS
document.onkeydown = checkKey; //function checkKey is called when a key is pressed. This function calls the move function.

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        // up arrow
        move("top");
    } else if (e.keyCode == '40') {
        // down arrow
        move("bottom");

    } else if (e.keyCode == '37') {
        // left arrow
        move("left")
    } else if (e.keyCode == '39') {
        move("right");
        // right arrow
    }
}


function move(direction) {
    var newX = currentPosition[level][1];
    var newY = currentPosition[level][0];
    switch (direction) {
        case "right":
            newX++;
            break;
        case "left":
            newX--;
            break;
        case "top":
            newY--;
            break;
        case "bottom":
             newY++;
            break;
    }
    if (checkHitWall(newX, newY)) //if you hit a wall you cannot move
    {
        console.log("You hit a wall");
    }
    else if (checkHitBox(newX, newY)) //if you hit a box the function that moves the box is called
    {
        moveBox(direction, newX, newY);
    } else  //otherwise you move, i.e. the newX and newY are implemented as the new currentPosition
    {
        currentPosition[level][1] = newX;
        currentPosition[level][0] = newY;
    }
    createBoard(); //new board must be created after every move
}


function checkHitWall(x, y) //this function checks if a wall is hit (parameters can be random here, when function is actually called, correct parameters must be used (newX, newY)
{
    if (matrix[level][y][x] !== "W") //if the newY or newX we want to move to is not a wall, return false
    {
        return false;
    }
    return true;
}

function checkHitBox(x, y) //this function checks if the new position of the player is the same as the box position
{
    for (var boxIndex = 0; boxIndex < boxPositions[level].length; boxIndex++) {
        if (boxPositions[level][boxIndex][1] === x && boxPositions[level][boxIndex][0] === y) {
            return true;
        }
    }
}

function moveBox(direction, newX, newY) {
    var indexOfBox;
    for (var boxIndex = 0; boxIndex < boxPositions[level].length; boxIndex++) {
        if (boxPositions[level][boxIndex][1] === newX && boxPositions[level][boxIndex][0] === newY) {
            indexOfBox = boxIndex; //depending on which box (0 or 1) is being aimed at by the player, the indexOfBox changes (either 0 or 1)
        }
    }
  //  var saveX = newX; //this will be important once we want the player to take the previous position of the box
  //  var saveY = newY;
    var newBoxX = boxPositions[level][indexOfBox][1];
    var newBoxY = boxPositions[level][indexOfBox][0];

    switch (direction) {
        case "right":
            newBoxX++;
            break;
        case "left":
            newBoxX--;
            break;
        case "top":
            newBoxY--;
            break;
        case "bottom":
            newBoxY++;
            break;
    }
    if (checkHitWall(newBoxX, newBoxY))  //check if box hits a wall
    {
        console.log("Box hit wall");
    } else if (checkHitBox(newBoxX, newBoxY)) //check if box is being blocked by another box
    {
        console.log("Box hit another box");
    } else  //move box and make player take previous position of box
    {
        boxPositions[level][indexOfBox][1] = newBoxX;
        boxPositions[level][indexOfBox][0] = newBoxY;
        currentPosition[level][0] = newY;
        currentPosition[level][1] = newX;
        winGame(); //check win once box is moved
    }
}


//WIN FUNCTION
function winGame() {
    var boxInPos = []; //says boxes are in wrong position because the game isn't won yet (see loop pushing "false")

    for (var i = 0; i<boxPositions[level].length;i++){
        boxInPos.push(false);
    }
    //Here we compare the box position with the win position
    for (var i= 0; i<winPositions[level].length; i++){
        for(var j =0; j<boxPositions[level].length; j++){
            if(boxPositions[level][j][0] == winPositions[level][i][0] && boxPositions[level][j][1] == winPositions[level][i][1] ){
                boxInPos[j] = true; //boxes are in win position - false is replaced by true
            }
        }
    }

    var pWin = true; //this has to be before the next loop to make sure that the next loop falsifies this claim in case even only one box is in the wrong position

    for (var i = 0; i<boxPositions[level].length;i++) //this loop check if all boxes are in the right position, if not if falsifies the aforementioned claim for all boxes
    {
        if(boxInPos[i] == false){
            pWin=false;
        }
    }

    //get to next level after a win
    if(pWin == true && level < 3){
        console.log("win"); //this now only appears when all boxes are on winning positions
        reset();
        level++;
        printLevel++;
    }

    //end game after three levels
    if (level>=3) {
        playerWin = true;
        $("#timer").hide();
        $("#level").hide();
        $("#container").hide();
        $("#winContainer").show();
        $("#winContainer").html("You win!");
    }
}


function replay() {
    location.reload();
}