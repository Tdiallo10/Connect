let PlayerRed = "R";
let playerYellow= "Y";
let currPlayer = PlayerRed;

let gameOver = false;
let board;
let currColumns;

let winCountRed = 0;
let winCountYellow = 0;

let rows = 6;
let columns = 7;

window.onload = function() {
    setGame();
}



function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5]

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // js
            row.push('');                                                                                                                                                                                                                                                                                                                                                                   

            // html
            // <div id="0-0" class="tile"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }

    updateWinCountsDisplay(); // Adding the number of wins a player has

   

}

function setPiece() {
    if (gameOver) {
        return; 
    }


    let coords = this.id.split("-");   // "0-0" -> ["0", "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currColumns[c];
    if(r < 0) {
        return;
    }
    
    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == PlayerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = PlayerRed;
    }

   r -= 1; //   updating row heigh for columns
   currColumns[c] = r; //upadating array

 checkWinner();

}

function checkWinner() {
    //horizontally
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != '') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    //vertically
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-3; r++) {
            if (board[r][c] != '') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    //anti diagonally
    for ( let r = 0; r < rows-3; r++){
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != '') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    //diagonally
    for (let r =3; r < rows; r++) {
        for (let c = 0; c < columns -3; c++){
            if (board[r][c] != '') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == PlayerRed) {
        winner.innerText = "Red Wins";
        winCountRed++;
    } else {
        winner.innerText = "Yellow Wins";
        winCountYellow++;
    }

    gameOver = true;
    gameOver = true;
        displayWinner();
        updateWinCountsDisplay(); // Update win counts display
        return;
    
}

function displayWinner() {
    // Display winner and highlight winning cells...
}

function updateWinCountsDisplay() {
    document.getElementById("win-count-red").innerText = winCountRed;
    document.getElementById("win-count-yellow").innerText = winCountYellow;
}

document.getElementById("restButton").addEventListener("click", restGame);

function restGame() {
    // clears the board 
       var cells =
    document.querySelectorAll('.cell');cells.forEach(cell => {
        cell.classList.remove('red', 'yellow');
    });
        
        currPlayer = 'red';
}

board = [];
for (let r= 0; r < 6; r++) {
    board[r] = [];
    for(let c = 0; c < 7; c++) {
        board[r][c] = ';'
    }
}