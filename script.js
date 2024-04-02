const board = document.getElementById('board');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
const popup = document.getElementById('popup');
const winnerList = document.getElementById('winnerList');

let currentPlayer = 'X';
let isGameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let winners = [];

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6] 
];

const checkWinner = () => {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            isGameActive = false;
            const winner = gameState[a];
            winners.push(winner);
            showWinnerPopup(winner);
            updateWinnerList();
            return;
        }
    }
    if (!gameState.includes('')) {
        isGameActive = false;
        showWinnerPopup('Tie');
    }
};

const handleCellClick = (index) => {
    if (!isGameActive || gameState[index] !== '') return;

    gameState[index] = currentPlayer;
    document.getElementById(`cell-${index + 1}`).innerText = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.innerText = `Player ${currentPlayer}'s turn`;
};

const restartGame = () => {
    currentPlayer = 'X';
    isGameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
    status.innerText = `Player ${currentPlayer}'s turn`;
};

const showWinnerPopup = (winner) => {
    popup.style.display = 'block';
    popup.innerText = winner === 'Tie' ? "It's a Tie!" : `Player ${winner} wins!`;
};

const closeWinnerPopup = () => {
    popup.style.display = 'none';
};

const updateWinnerList = () => {
    winnerList.innerHTML = '';
    winners.forEach((winner, index) => {
        const listItem = document.createElement('li');
        listItem.innerText = `Game ${index + 1}: Player ${winner}`;
        winnerList.appendChild(listItem);
    });
};

board.addEventListener('click', (e) => {
    const clickedCell = e.target;
    const cellIndex = parseInt(clickedCell.id.split('-')[1]) - 1;
    handleCellClick(cellIndex);
});

restartBtn.addEventListener('click', () => {
    closeWinnerPopup();
    restartGame();
});

status.innerText = `Player ${currentPlayer}'s turn`;
      