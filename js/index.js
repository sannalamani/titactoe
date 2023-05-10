
let cellsEL = document.querySelectorAll('.cell');
let msgEL = document.querySelector('#msg');
let playerEL = document.querySelectorAll('.score');

let playerSign=['X','O'];
let currentPlayer = 0;
let count = 0;
let draw=false;
let win=false;
let winner = 0;
let player_sc=[0,0];

function showMsg(msg){
    msgEL.innerHTML=msg;
    msgEL.style.display = 'block';
}

function clearMsg(){
    msgEL.style.display = 'none';
}

function verifyDraw(){
    cellsEL.forEach(cellsEL=>{
        if(cellsEL.innerHTML==''){
            draw=false;
        }
        else
        {
            count++;
        }
});
        if(count==9){
                showMsg('Game Tie!<a href="#" onclick="playAgain()">Play Again</a>');
                draw = true
        }
        count=0;
}
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
    for (let i = 0; i < winningPositions.length; i++) {
        const [a, b, c] = winningPositions[i];
        if (cellsEL[a].innerHTML && cellsEL[a].innerHTML === cellsEL[b].innerHTML && cellsEL[a].innerHTML === cellsEL[c].innerHTML) {
            
           winner = currentPlayer+1;
           win=true;
           player_sc[currentPlayer]++;
        }
      }
    if(win){
        showMsg('Player '+winner+': Won <a href="#" onclick="playAgain()">Play Again</a>');
        playerEL[currentPlayer].innerHTML=player_sc[currentPlayer];

    }
}

function playAgain(){
    currentPlayer = 0;
     count = 0;
     draw=false;
     win=false;
     cellsEL.forEach(cellsEL=>{
        cellsEL.innerHTML='';
     });
     clearMsg();

}

cellsEL.forEach(cellsEL => {
    cellsEL.addEventListener('click',function(event){

        if(!win){
        if(!draw){
        if (event.target.innerHTML == '') {

            event.target.innerHTML = playerSign[currentPlayer];
            clearMsg();
            verifyDraw();
            verifyWin();
            currentPlayer = currentPlayer === 1 ? 0 : 1;
            
        } else{
            showMsg('Already played!');
        }
        }  
    }  
    });

});