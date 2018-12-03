let userScore = 0;
let computerScore = 0;
let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let isWin;

const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");


// ROCK PAPER SCISSORS

function getComputerChoice() {
  const choices = ['r', 'p', 's'];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

function convertToWord(letter) {
  if (letter === "r") return "Rock";
  if (letter === "p") return "Paper";
  return "Scissors";
}

function win(user, computer) {
  const smallUserWord = "user".fontsize(3).sub();
  const smallCompWord = "comp".fontsize(3).sub();
  const userChoice_id = document.getElementById(user);
  userScore++;
  userScore_span.innerHTML = userScore;
  result_p.innerHTML = `${convertToWord(user)}${smallUserWord} beats ${convertToWord(computer)}${smallCompWord}. You isWin!`;
  userChoice_id.classList.add('green-glow');
  setTimeout(() => userChoice_id.classList.remove('green-glow'), 300);
}

function lose(user, computer) {
  const smallUserWord = "user".fontsize(3).sub();
  const smallCompWord = "comp".fontsize(3).sub();
  const userChoice_id = document.getElementById(user);
  computerScore++;
  computerScore_span.innerHTML = computerScore;
  result_p.innerHTML = `${convertToWord(user)}${smallUserWord} loses to ${convertToWord(computer)}${smallCompWord}. You lost...`;
  userChoice_id.classList.add('red-glow');
  setTimeout(() => userChoice_id.classList.remove('red-glow'), 300);
}

function draw(user, computer) {
  const smallUserWord = "user".fontsize(3).sub();
  const smallCompWord = "comp".fontsize(3).sub();
  const userChoice_id = document.getElementById(user);
  result_p.innerHTML = `${convertToWord(user)}${smallUserWord} equals ${convertToWord(computer)}${smallCompWord}. It's draw.`;
  userChoice_id.classList.add('gray-glow');
  setTimeout(() => userChoice_id.classList.remove('gray-glow'), 300);
}

function game(userChoice) {
  const computerChoice = getComputerChoice();
  switch (userChoice + computerChoice) {
    case "rs":
    case "pr":
    case "sp":
      win(userChoice, computerChoice);
      break;
    case "rp":
    case "ps":
    case "sr":
      lose(userChoice, computerChoice);
      break;
    case "rr":
    case "pp":
    case "ss":
      draw(userChoice, computerChoice);
      break;
  }
}

function main() {
  rock_div.addEventListener('click', () => game("r"));

  paper_div.addEventListener('click', () => game("p"));

  scissors_div.addEventListener('click', () => game("s"))
}

main();


// SIMON

strictButton.addEventListener('click', () => {
  if (strictButton.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});

onButton.addEventListener('click', () => {
  if (onButton.checked == true) {
    on = true;
    turnCounter.innerHTML = "-";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
});

startButton.addEventListener('click', () => {
  if (on || isWin) {
    play();
  }
});

function play() {
  isWin = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;
  for (var i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;

  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  on = false;

  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }

  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
}

function one() {
  if (noise) {
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  topLeft.style.backgroundColor = "lightgreen";
}

function two() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  topRight.style.backgroundColor = "tomato";
}

function three() {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  bottomLeft.style.backgroundColor = "yellow";
}

function four() {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  bottomRight.style.backgroundColor = "lightskyblue";
}

function clearColor() {
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomLeft.style.backgroundColor = "goldenrod";
  bottomRight.style.backgroundColor = "darkblue";
}

function flashColor() {
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomLeft.style.backgroundColor = "yellow";
  bottomRight.style.backgroundColor = "lightskyblue";
  setTimeout(() => {
    clearColor();
  },2000);
}

topLeft.addEventListener('click', () => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if(!isWin) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

topRight.addEventListener('click', () => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if(!isWin) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomLeft.addEventListener('click', () => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if(!isWin) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomRight.addEventListener('click', () => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if(!isWin) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  if (playerOrder.length == 4 && good) {
    winGame();
  }

  if (good == false) {
    flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();

      if (strict) {
        play();
      } else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);

    noise = false;
  }

  if (turn == playerOrder.length && good && !isWin) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }

}

function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
  isWin = true;
}