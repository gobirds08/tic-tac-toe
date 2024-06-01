const start_button = document.getElementById("start")
const reset_button = document.getElementById("reset")
const grid_items = document.querySelectorAll('.grid-item');

var player = 1;

grid_items.forEach((item, index) => {
    const button = item.querySelector('button');
    button.addEventListener('click', gridItemClicked(item, index));
  });


function gridItemClicked(div, index){
    //check if valid move
    if(!validMove()){
        return;
    }
    completeMove();
    const result = checkGameOver();
    if(result == 0){

    }else if(result == 1){

    }else{

    }
}

function validMove(){

}

function completeMove(){

}

function checkGameOver(){

}