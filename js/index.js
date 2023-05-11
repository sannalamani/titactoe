
let cellsEL = document.querySelectorAll('.cell');
let msgEL = document.querySelector('#msg');
let playerEL = document.querySelectorAll('.score');
const resetEL = document.getElementById('resetLink');

let playerSign=['X','O'];
let currentPlayer = 0;
let draw_count = 0;
let draw=false;
let win=false;
let winner = 0;
let player_sc=[0,0];
let flag=0;

function showMsg(msg){
    msgEL.innerHTML=msg;
    msgEL.style.display = 'block';
}

function clearMsg(){
    msgEL.style.display = 'none';
}

//fumction to verify match is Tie or not
function verifyDraw(){
    cellsEL.forEach(cellsEL=>{
        if(cellsEL.innerHTML==''){
            draw=false;
        }
        else
        {
            //increasing the count to 9(if all boxes are filled and match is tie if no winner found)
            draw_count++;
        }
});
    if(draw_count==9){
        draw=true;
    }
        draw_count=0;
}

function reset(){
    console.log('inisde reset');
    localStorage.setItem('player1Score',0);
    localStorage.setItem('player2Score',0);
    player_sc=[0,0];
}



//function to check the winner if possible by rows columns and diagonals
function verifyWin(){
    const winningPositions = [    // Rows    
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6]
    ];
    //comparing all the above possiblity arrays to check all values are equal or not for winner decleration
    for (let i = 0; i < winningPositions.length; i++) {
        const [a, b, c] = winningPositions[i];
        if (cellsEL[a].innerHTML && cellsEL[a].innerHTML === cellsEL[b].innerHTML && cellsEL[a].innerHTML === cellsEL[c].innerHTML) {
            
            cellsEL[a].style.background="yellow";
            cellsEL[b].style.background="yellow";
            cellsEL[c].style.background="yellow";
           winner = currentPlayer+1;
           win=true;
           player_sc[currentPlayer]++;
           localStorage.setItem('player1Score', player_sc[0]);
           localStorage.setItem('player2Score', player_sc[1]);
        }
      }   
}

//function called to restart the game by reseting the grid
function playAgain(){
    currentPlayer = 0;
     draw_count = 0;
     draw=false;
     win=false;
     cellsEL.forEach(cellsEL=>{
        cellsEL.innerHTML='';
        cellsEL.style.background="white";
     });
     showMsg('Start : Player 1 turn');
     
}

showMsg('Start : Player 1 turn');

if (localStorage.getItem('player1Score') !== null) {
    player_sc[0] = parseInt(localStorage.getItem('player1Score'));
  }
  
  if (localStorage.getItem('player2Score') !== null) {
     player_sc[1] = parseInt(localStorage.getItem('player2Score'));
  }

  function showScore(){
         // Retrieve player 1's score from local storage
         const storedPlayer1Score = localStorage.getItem('player1Score');
  
         // Retrieve player 2's score from local storage
         const storedPlayer2Score = localStorage.getItem('player2Score');

         playerEL[0].innerHTML=storedPlayer1Score;
         playerEL[1].innerHTML=storedPlayer2Score;
  }
  
resetEL.addEventListener('click',function(event){
        reset();
        showScore();
        playAgain();
});

showScore();
//event listener to wait for click and run the win and draw conditions after each user's turn(click)
cellsEL.forEach(cellsEL => {
    cellsEL.addEventListener('click',function(event){
        if(!win){
        if(!draw){   
        if (event.target.innerHTML == '') {
            event.target.innerHTML = playerSign[currentPlayer];
            verifyDraw();
            verifyWin();
            
            showMsg('Player '+(!currentPlayer+1)+' turn');

            if(draw){
                showMsg('Game Tie!<a href="#" onclick="playAgain()"> Play again </a>');
            }
            
            if(win){
                showMsg('Player '+winner+': Won <a href="#" onclick="playAgain()"> play again </a>');
                showScore();
            }
            currentPlayer = currentPlayer === 1 ? 0 : 1;
            
        } else{
            showMsg('Already played! -> *Player '+(currentPlayer+1)+' turn*');
        }
        }  
    }  
    });

});