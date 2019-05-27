var player=1; //1 for Yellow, 2 for Red
var game_active = false;
var count = 0;
var grid = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];

//A function used to start the game
function beginGame() {
    if(game_active == true){return false};
    game_active = true;
    resetGrid();
    refreshGrid();
}

//A function used to add a token (when possible) based on the slected column
function drop(col) {
    for(row=5; row>=0; row--) {
      if (grid[row][col] == 0) {
          grid[row][col] = player;

          refreshGrid();
          count++;

          if (player==1) {
                player=2;
                document.getElementById("colorTurn").innerHTML="Player2 - Red";
          } else {
                player=1;
                document.getElementById("colorTurn").innerHTML="Player1 - Yellow";
          }
          return true;
    }
  }
}

//Check for win for Player1 and Player2
function winGame() {
    //Check for win from left-to-right
      for(var i=1; i<=2; i++) {
        for(var col=0; col<=3; col++){
          for(var row=0; row<=5; row++){
            if(grid[row][col] == i){
                if((grid[row][col+1] == i) && (grid[row][col+2] == i) && (grid[row][col+3] == i)) {
                    endGame(i);
                    return true;
                }
            }
          }
        }
      }

      //Check for win from top-to-bottom
        for(var i=1; i<=2; i++) {
          for(var col=0; col<=6; col++){
            for(var row=0; row<=2; row++){
              if(grid[row][col] == i){
                  if((grid[row+1][col] == i) && (grid[row+2][col] == i) && (grid[row+3][col] == i)) {
                      endGame(i);
                      return true;
                  }
              }
            }
          }
        }

        //Check for win for diagonal down
          for(var i=1; i<=2; i++) {
            for(var col=0; col<=3; col++){
              for(var row=0; row<=2; row++){
                if(grid[row][col] == i){
                    if((grid[row+1][col+1] == i) && (grid[row+2][col+2] == i) && (grid[row+3][col+3] == i)) {
                        endGame(i);
                        return true;
                    }
                }
              }
            }
          }

          //Check for win for diagonal up
            for(var i=1; i<=2; i++) {
              for(var col=0; col<=3; col++){
                for(var row=3; row<=5; row++){
                  if(grid[row][col] == i){
                      if((grid[row-1][col+1] == i) && (grid[row-2][col+2] == i) && (grid[row-3][col+3] == i)) {
                          endGame(i);
                          return true;
                      }
                  }
                }
              }
            }
}

//A function to add the end game logic
function endGame(winningPlayer) {
  game_active = false;
  document.getElementById('winnerInfo').innerHTML = winningPlayer ;
  document.getElementById('grid').classList.add("avoid-clicks");
}


//A function used to refresh the connect4 grid on screen
function refreshGrid() {
  winGame();

  //Check if the grid is full
     if(count === 41){
         document.getElementById('winnerInfo').innerHTML = "GAME OVER! It's a draw!" ;
     }

  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 7; col++) {
      if (grid[row][col]==0) {
                document.getElementById("cell"+row+col).style.backgroundColor="#FFFFFF";
      } else if (grid[row][col]==1) { //1 for yellow
                document.getElementById("cell"+row+col).style.backgroundColor="#FFFF00";
      } else if (grid[row][col]==2) { //2 for red
                document.getElementById("cell"+row+col).style.backgroundColor="#FF0000";
       }
    }
  }
}

//A function to reset the game
function resetGrid() {
  for (row=0; row<6; row++) {
					for (col=0; col<7; col++) {
						grid[row][col] = 0;
            count = 0;
            document.getElementById("cell"+row+col).style.backgroundColor="#FFFFFF";
            document.getElementById('winnerInfo').innerHTML = "";
            document.getElementById('grid').classList.remove("avoid-clicks");
            document.getElementById('colorTurn').innerHTML = "";
					}
		}

}
