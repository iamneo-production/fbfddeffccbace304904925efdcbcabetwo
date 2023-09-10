const board = document.getElementById("board");
const buttons = document.querySelectorAll(".btn");
const resultText = document.getElementsByClassName("result");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (let combo of winCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            return gameBoard[a];
        }
    }
    if (!gameBoard.includes("")) {
        gameActive = false;
        return "Draw";
    }
    return null;
}

function handleButtonClick(event) {
    const index = event.target.id;
    if (gameBoard[index] === "" && gameActive) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.disabled = true;
        
        const winner = checkWinner();
        if (winner) {
            if (winner === "Draw") {
                resultText.textContent = "It's a Draw!";
            } else {
                resultText.textContent = `Player ${winner} Won 🎉`;
            }
            resetBtn.disabled = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            resultText.textContent = `Player ${currentPlayer} Turn`;
        }
    }
}
function resetBoard() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    buttons.forEach(button => {
        button.textContent = "";
        button.disabled = false;
    });
    resultText.textContent = "Player X turn";
    resetBtn.disabled = true;
}
buttons.forEach(button => {
    button.addEventListener("click", handleButtonClick);
});
resetBtn.addEventListener("click", resetBoard);