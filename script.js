const reset_button = document.getElementById("reset")
const grid_items = document.querySelectorAll('.grid-item');
const player_turn_text = document.getElementById('player-turn')

var player = 1;
var gameOver = false;

const grid = Array(9).fill(0);

const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
];

reset_button.onclick = reset;
// reset_button.addEventListener('click', reset);

grid_items.forEach((item, index) => {
    const button = item.querySelector('button');
    button.addEventListener('click', () => gridItemClicked(item, index));
  });


function gridItemClicked(div, index){
    if(gameOver){
        return;
    }
    //check if valid move
    if(!validMove(index)){
        return;
    }
    completeMove(div, index);
    const result = checkGameOver(index);
    if(result == 0){
        player_turn_text.innerText = 'Draw: Game Over!'
    }else if(result == -1){
        player_turn_text.innerText = `Player ${player}'s Turn`
    }else{
        player_turn_text.innerText = `Player ${player} wins! Game Over!`
        gameOver = true;
    }
}

function validMove(index){
    if(grid[index] != 0){
        return false;
    }
    return true;
}

function completeMove(div, index){
    grid[index] = player;
    const playerIcon = document.createElement('i');
    if(player == 1){
        playerIcon.setAttribute('class', 'fa-solid fa-x icon');
    }else{
        playerIcon.setAttribute('class', 'fa-regular fa-circle icon');
    }
    const button = div.querySelector('button');
    button.appendChild(playerIcon)
}

function checkGameOver(index){
    // Filter out the winning combinations that include the given index
    const relevantCombinations = winningCombinations.filter(combination => combination.includes(index));

    // Check if any of these combinations are complete (i.e., all indices in the combination have the same player value)
    for (const combination of relevantCombinations) {
        if (combination.every(i => grid[i] === player)) {
            return player; // Return the player who won
        }
    }

    // Check if the grid is full (i.e., no 0 values in the grid)
    if (grid.every(value => value !== 0)) {
        return 0; // Indicates a draw
    }
    if(player == 1){
        player = 2;
    }else{
        player = 1;
    }
    return -1; // Indicates the game is still ongoing
}

function reset(){
    gameOver = false;
    console.log("reset")
    grid.fill(0);
    const icons = document.querySelectorAll('i');
    icons.forEach(icon => icon.remove());
    player = 1;
    player_turn_text.innerText = 'Player 1\'s Turn'
}