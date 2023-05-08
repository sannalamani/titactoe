console.log('main hello')

let cellsEL = document.querySelectorAll('.cell');
let msgEL = document.querySelector('#msg');

let playerSign=['X','O'];
let currentPlayer = 0;

function showMsg(msg){
    msgEL.innerHTML=msg;
    msgEL.style.display = 'block';

}

function clearMsg(){
    msgEL.style.display = 'none';
}

function verifyWin(){

    
}

cellsEL.forEach(cellsEL => {
    cellsEL.addEventListener('click',function(event){

        if (event.target.innerHTML == '') {

            event.target.innerHTML = playerSign[currentPlayer];
            clearMsg()
        if (currentPlayer==0) {
            currentPlayer=1;
        } else {
            currentPlayer=0
        }
            
        } else{
            showMsg('Already played!');
        }
        
    });

    });