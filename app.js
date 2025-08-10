const boxes = document.querySelectorAll(".box");
const resetButton = document.querySelector("#reset-button");
const newGameButton = document.querySelector("#new-button");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turnO = true; // true -> O's turn, false -> X's turn

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  msg.innerText = "";
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // Prevent overwriting if already filled
    if (box.innerText !== "") return;

    box.innerText = turnO ? "O" : "X";
    box.disabled = true;
    turnO = !turnO;

    checkWinner();
  });
});

const disableBoxes = () => {
  boxes.forEach(b => b.disabled = true);
};

const enableBoxes = () => {
  boxes.forEach(b => {
    b.disabled = false;
    b.innerText = "";
  });
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const va = boxes[a].innerText;
    const vb = boxes[b].innerText;
    const vc = boxes[c].innerText;

    if (va !== "" && va === vb && vb === vc) {
      showWinner(va);
      return;
    }
  }

  // Draw check: if all boxes filled and no winner
  const isDraw = Array.from(boxes).every(box => box.innerText !== "");
  if (isDraw) {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
  }
};

newGameButton.addEventListener('click', resetGame);
resetButton.addEventListener('click', resetGame);

// Initialize board on load
resetGame();
