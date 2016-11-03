//Global variables used to implement move counter and time
var moves = 0;
var offset;
var counter;
var interval;

window.onload = function(e){
  var puzzle = document.getElementById("puzzlearea");
  var squares = puzzle.getElementsByTagName("div");
  var shuffleButton = document.getElementById("shufflebutton");
  var heading = document.getElementsByTagName("h1");
  var self = this;
  var overall = false;
  var timer = createTimer();
  
  //Appends span contianing move counter and timer to the heading 
  heading[0].appendChild(timer);

  //Arranges playing area if not yet set up
  if (!overall){
    var sixteen = self.overall();
  }

  //Checks if any of the puzzle pieces have been clicked
  for( var i = 0; i < squares.length; i++){
    squares[i].onclick = function(element){
      //Checks if puzzle piece can be moved
      if ( element.target.className == "puzzlepiece movablepiece"){
        moves++;
        sixteen = self.moveSquare(sixteen, element.target.innerHTML);
      }
    }
  }

  //Shuffles the squares and starts timer
  shuffleButton.onclick = function(){
    sixteen =  shuffle(sixteen);
    counter = 0;
	display();
    startTimer();
  }

  function startTimer() {
    if (!interval) {
      offset = Date.now();
      interval = setInterval(update, 1000);
    }
  }

  //Function used to increment timer
  function update() {
    counter += inc();
    display();
  }

  function display() {
    timer.innerHTML = "<br> Duration: " + parseInt(counter/1000) + " second(s)" + "<br>Total Moves Made: " + moves ;
  }

  //Helper function used to increment timer
  function inc() {
    var now = Date.now(),
        d   = now - offset;
    offset = now;
    return d;
  }
}
//Creates span in heading
function createTimer() {
  return document.createElement("span");
}

//This function sets up of the initial solved puzzle
function overall(){
  var puzzle = document.getElementById("puzzlearea");
  var squares = puzzle.getElementsByTagName("div");
  var bgCordinateY = 0;
  var bgCordinateX = 0;

  for( var i = 0; i < squares.length; i++){
    squares[i].className = "puzzlepiece";
    squares[i].style.position = "relative";
    squares[i].style.float = "left";
    squares[i].style.backgroundPosition = bgCordinateX + "px " + bgCordinateY + "px";
    squares[i].style.top = "0px";
    squares[i].style.right = "0px";
    squares[i].style.bottom = "0px";
    squares[i].style.left = "0px";

    if (bgCordinateX != -300 ){
      bgCordinateX -= 100;
    }
    else{
      bgCordinateX = 0;
      bgCordinateY -= 100;
     }
  }
  //Initializes movable pieces of the puzzle.
  squares[11].className =("puzzlepiece movablepiece");
  squares[14].className =("puzzlepiece movablepiece");
  //Returns initial layout of the puzzle, the relative positions of each square
  return [  [null,2,5,null], [null,3,6,1], [null,4,7,2], [null,null,8,3], 
            [1,6,9,null], [2,7,10,5], [3,8,11,6], [4,null,12,7], 
            [5,10,13,null], [6,11,14,9], [7,12,15,10], [8,null,16,11], 
            [9,14,null,null], [10,15,null,13], [11,16,null,14], [12,null,null,15] 
          ];
}

//Fuction used to move an element and returns the modified playing area.
function moveSquare(sixteen, element) {
  var puzzle = document.getElementById("puzzlearea");
  var squares = puzzle.getElementsByTagName("div");
  //Conditions that check the directions in which the puzzle piece can be moved
  if(sixteen[element - 1][0] == 16){
   return squareUp(sixteen, element, squares);
  }
  else if(sixteen[element - 1][1] == 16){
    return squareRight(sixteen, element, squares);
  }
  else if(sixteen[element - 1][2] == 16){
    return squareDown(sixteen, element, squares);
  }
  else if(sixteen[element - 1][3] == 16){
    return squareLeft(sixteen, element, squares);
  }
}

//Function used to adjust movable pieces.
//Adds class that makes them highlight on hover. 
function movableSquare(whiteSquare){
  var puzzle = document.getElementById("puzzlearea");
  var squares = puzzle.getElementsByTagName("div");

  for( var i = 0; i < squares.length; i++){
    squares[i].className = "puzzlepiece";
  }
  //Makes movable puzzle pieces movable
  for (var i = 0; i < whiteSquare.length; i++){
    if(whiteSquare[i] != null){
      squares[whiteSquare[i]-1].className = "puzzlepiece movablepiece";
    }
  }
}

//Function used to move a square Down
function squareDown(sixteen, element, squares){
  // Retrives the offset value of piece from the top margin
  var topVal = parseInt(squares[element - 1].style.top, 10);
  //Increases the distance from the margin by 100px
  squares[element - 1].style.top = (topVal + 100) + "px"; 
  //Modifies layout of tiles in the Playing Area
  if ( sixteen[element - 1][0] != null){ 
	sixteen[sixteen[element - 1][0] -1][2] = 16 }
  if ( sixteen[element - 1][1] != null){ 
	sixteen[sixteen[element - 1][1] -1][3] = 16 }
  if ( sixteen[element - 1][3] != null){ 
	sixteen[sixteen[element - 1][3] -1][1] = 16 }
  if ( sixteen[16 - 1][1] != null){ 
	sixteen[sixteen[16 - 1][1] -1][3] = sixteen[16 - 1][0] }
  if ( sixteen[16 - 1][2] != null){ 
	sixteen[sixteen[16 - 1][2] -1][0] = sixteen[16 - 1][0] }
  if ( sixteen[16 - 1][3] != null){ 
	sixteen[sixteen[16 - 1][3] -1][1] = sixteen[16 - 1][0] }      
  var swap = sixteen[element - 1];
  sixteen[element - 1] = sixteen[15];
  sixteen[element - 1][0] = 16;
  sixteen[15] = swap; 
  sixteen[15][2] = parseInt(element, 10);
  movableSquare(sixteen[15]);
  return sixteen;
}

//Function used to move a square Up 
function squareUp(sixteen, element, squares){
  // Retrives the offset value of piece from the top margin
  var topVal = parseInt(squares[element - 1].style.top, 10);
  //Decreases the distance from the margin by 100px
  squares[element - 1].style.top = (topVal - 100) + "px"; 
  //Modifies layout of tiles in the Playing Area
  if ( sixteen[element - 1][2] != null){ 
	sixteen[sixteen[element - 1][2] -1][0] = 16 }
  if ( sixteen[element - 1][1] != null){ 
	sixteen[sixteen[element - 1][1] -1][3] = 16 }
  if ( sixteen[element - 1][3] != null){ 
	sixteen[sixteen[element - 1][3] -1][1] = 16 }
  if ( sixteen[16 - 1][1] != null){ 
	sixteen[sixteen[16 - 1][1] -1][3] = sixteen[16 - 1][2] }
  if ( sixteen[16 - 1][0] != null){ 
	sixteen[sixteen[16 - 1][0] -1][2] = sixteen[16 - 1][2] }
  if ( sixteen[16 - 1][3] != null){ 
	sixteen[sixteen[16 - 1][3] -1][1] = sixteen[16 - 1][2] }  
  var swap = sixteen[element -1];
  sixteen[element - 1] = sixteen[15];
  sixteen[element - 1][2] = 16;
  sixteen[15] = swap; 
  sixteen[15][0] = parseInt(element, 10);
  movableSquare(sixteen[15]);
  return sixteen;
}

//Function used to move a square Right
function squareRight(sixteen, element, squares){
  //Retrives the offset value of piece from the left margin
  var leftVal = parseInt(squares[element - 1].style.left, 10);
  //Increases the distance from the margin by 100px
  squares[element - 1].style.left = (leftVal + 100) + "px"; 
 //Modifies layout of tiles in the Playing Area
  if ( sixteen[element - 1][0] != null){ 
	sixteen[sixteen[element - 1][0] -1][2] = 16 }
  if ( sixteen[element - 1][2] != null){ 
	sixteen[sixteen[element - 1][2] -1][0] = 16 }
  if ( sixteen[element - 1][3] != null){ 
	sixteen[sixteen[element - 1][3] -1][1] = 16 }
  if ( sixteen[16 - 1][0] != null){ 
	sixteen[sixteen[16 - 1][0] -1][2] = sixteen[16 - 1][3] }
  if ( sixteen[16 - 1][1] != null){ 
	sixteen[sixteen[16 - 1][1] -1][3] = sixteen[16 - 1][3] }
  if ( sixteen[16 - 1][2] != null){ 
	sixteen[sixteen[16 - 1][2] -1][0] = sixteen[16 - 1][3] } 
  var swap = sixteen[element - 1];
  sixteen[element - 1] = sixteen[15];
  sixteen[element - 1][3] = 16;
  sixteen[15] = swap; 
  sixteen[15][1] = parseInt(element, 10);
  self.movableSquare(sixteen[15]);
  return sixteen;
}

//Function used to move a square Left
function squareLeft(sixteen, element, squares){
  //Retrives the offset value of piece from the left margin
  var leftVal = parseInt(squares[element - 1].style.left, 10);
  //Increases the distance from the margin by 100px
  squares[element - 1].style.left = (leftVal - 100) + "px"; 
  //Modifies layout of tiles in the Playing Area
  if ( sixteen[element - 1][0] != null){ 
	sixteen[sixteen[element - 1][0] -1][2] = 16 }
  if ( sixteen[element - 1][1] != null){ 
	sixteen[sixteen[element - 1][1] -1][3] = 16 }
  if ( sixteen[element - 1][2] != null){ 
	sixteen[sixteen[element - 1][2] -1][0] = 16 }
  if ( sixteen[16 - 1][0] != null){ 
	sixteen[sixteen[16 - 1][0] -1][2] = sixteen[16 - 1][1] }
  if ( sixteen[16 - 1][2] != null){ 
	sixteen[sixteen[16 - 1][2] -1][0] = sixteen[16 - 1][1] }
  if ( sixteen[16 - 1][3] != null){ 
	sixteen[sixteen[16 - 1][3] -1][1] = sixteen[16 - 1][1] } 
  var swap = sixteen[element - 1];
  sixteen[element - 1] = sixteen[15];
  sixteen[element - 1][1] = 16;
  sixteen[15] = swap; 
  sixteen[15][3] = parseInt(element, 10);
  movableSquare(sixteen[15]);
  return sixteen;
}

//Function used to suffle squares.
function shuffle(sixteen){
  var x = Math.floor((Math.random() * 4));
  //Uses Fifty moves to shuffle the board
  for ( var i = 0; i < 35; i++){
    /*
     *  Loops until a movable piece is selected, for efficiency pieces are selected from the sides
     *  of the blank tile.
    */
    while(sixteen[15][x] == null){ 
		x = Math.floor((Math.random() * 4))
	}
    sixteen = moveSquare(sixteen, sixteen[15][x]);
    x = Math.floor((Math.random() * 4));
  }
  moves = 0;
  return sixteen;
}
