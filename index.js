const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
let imgSrc = '<img src="images/present.png" alt="present" class="cell-image">';

const words = [
  "Easter",
  "Christmas",
  "Victory day",
  "Women’s day",
  "Birthday",
  "New Year",
  "Father’s Day",
  "Valentine’s Day",
  "Mother’s Day",
];

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "You";
let running = false;

initializeGame();

function initializeGame() {
  cells.forEach((cell) => {
    cell.innerHTML = imgSrc;
    cell.addEventListener("click", cellClicked);
  });
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}r turn`;
  running = true;
}
function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");

  if (options[cellIndex] != "" || !running) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}
function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = words[index];
}
function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} win!`;
  } else if (!options.includes("")) {
    statusText.textContent = `The End!`;
    running = false;
  }
}
function restartGame() {
  currentPlayer = "You";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}r turn`;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.innerHTML = imgSrc;
  });
  running = true;
}
