// Define variables
let currentPlayer = "Red";
let gameOver = false;
let board = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""]
];

// Function to handle a player's move
function play(column) {
    if (isGameOver()) return;

    // Find the lowest available row in the selected column
    let row = 5;
    while (row >= 0 && board[row][column] !== "") {
        row--;
    }

    // If the column is full, do nothing
    if (row === -1) return;

    // Update the board with the current player's color
    board[row][column] = currentPlayer;

    // Update the UI to display the disc with the current player's color
    document.getElementById(`${row}-${column}`).classList.add(currentPlayer === "Red" ? "red-disc" : "yellow-disc");

    // Check for a winner
    if (checkForWinner(row, column)) {
        gameOver = true;
        document.getElementById("winner").innerText = `${currentPlayer} wins!`;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === "Red" ? "Yellow" : "Red";
}

// Function to check if the game is over
function isGameOver() {
    return gameOver;
}

// Function to check for a winner
function checkForWinner(row, column) {
    // Check horizontally
    if (
        checkLine(row, column, 0, 1) ||
        checkLine(row, column, 0, -1)
    ) return true;

    // Check vertically
    if (checkLine(row, column, 1, 0)) return true;

    // Check diagonally
    if (
        checkLine(row, column, 1, 1) ||
        checkLine(row, column, 1, -1)
    ) return true;

    return false;
}

// Function to check if there are four consecutive discs in a line
function checkLine(row, column, deltaRow, deltaColumn) {
    const disc = board[row][column];
    let count = 1; // Count of consecutive discs

    // Check forward
    let r = row + deltaRow;
    let c = column + deltaColumn;
    while (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] === disc) {
        count++;
        r += deltaRow;
        c += deltaColumn;
    }

    // Check backward
    r = row - deltaRow;
    c = column - deltaColumn;
    while (r >= 0 && r < 6 && c >= 0 && c < 7 && board[r][c] === disc) {
        count++;
        r -= deltaRow;
        c -= deltaColumn;
    }

    // If count is 4 or more, we have a winner
    return count >= 4;
}

// Function to reset the game
function resetGame() {
    currentPlayer = "Red";
    gameOver = false;
    board = [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""]
    ];

    document.getElementById("winner").innerText = "";

    // Remove disc colors from all tiles
    document.querySelectorAll('.tile').forEach(tile => {
        tile.classList.remove("red-disc", "yellow-disc");
    });
}

// Add event listener to reset button after the DOM has fully loaded
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("resetButton").addEventListener("click", resetGame);

    // Add event listeners to each tile on the board
    document.querySelectorAll(".tile").forEach((tile, index) => {
        tile.addEventListener("click", () => {
            if (!isGameOver()) {
                play(index % 7);
            }
        });
    });
});
