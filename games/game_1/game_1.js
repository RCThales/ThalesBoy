const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

/*GAME*/
class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

canvas.width = 300;
canvas.height = 300;

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount;

let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let inputsXVelocity = 0;
let inputsYVelocity = 0;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

let gameMainAudio = new Audio("./game_1_audio/themesong.mp3");
let deathAudio = new Audio("./game_1_audio/error.wav");

const gulpSound = new Audio("./game_1_audio/gulp.mp3");

window.addEventListener("load", () => {
  gameMainAudio.play();
  gameMainAudio.volume = 0.5;
});

const drawGame = () => {
  xVelocity = inputsXVelocity;
  yVelocity = inputsYVelocity;

  changeSnakePosition();
  let result = isGameOver();
  if (result) {
    return;
  }

  clearScreen();
  checkAppleCollision();
  drawApple();
  drawSnake();
  drawScore();

  if (score > 5) {
    speed = 9;
  }
  if (score > 10) {
    speed = 11;
  }

  setTimeout(drawGame, 1000 / speed);
};

const addResetButton = () => {
  const button = document.createElement("button");
  button.innerHTML = "Restart Game";
  button.style.position = "absolute";
  button.style.left = `${canvas.offsetLeft + canvas.width / 2 - 70}px`;
  button.style.top = `${canvas.offsetTop + canvas.height / 2 + 40}px`;
  button.style.zIndex = 10;
  button.style.fontSize = "20px";
  button.onclick = () => location.reload();
  document.body.appendChild(button);
};

const getHighScore = () => {
  const savedScore = localStorage.getItem("highScore");
  return savedScore ? parseInt(savedScore) : 0;
};

const setHighScore = (score) => {
  localStorage.setItem("highScore", score.toString());
};
const isGameOver = () => {
  let gameOver = false;

  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  if (headX < 0 || headX === tileCount || headY < 0 || headY === tileCount) {
    gameOver = true;
  }

  snakeParts.forEach((part) => {
    if (part.x === headX && part.y === headY) {
      gameOver = true;
    }
  });

  if (gameOver) {
    addResetButton();

    gameMainAudio.pause();
    gameMainAudio.currentTime = 0;
    deathAudio.play();

    const highScore = getHighScore();
    if (score > highScore) {
      setHighScore(score);
    }

    ctx.fillStyle = "white";
    ctx.font = "25px Verdana";
    ctx.fillText(`Score: ${score}`, canvas.width / 3, canvas.height / 4);
    ctx.fillText(
      `High Score: ${getHighScore()}`,
      canvas.width / 5.3,
      canvas.height / 2,
    );

    return gameOver;
  }
};

const drawScore = () => {
  ctx.fillStyle = "white";
  ctx.font = "25px Verdana";
  ctx.fillText(score, canvas.width - 395, 25);
};

const clearScreen = () => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const drawSnake = () => {
  ctx.fillStyle = "green";
  snakeParts.forEach((part) => {
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  });

  snakeParts.push(new SnakePart(headX, headY));
  if (snakeParts.length > tailLength) {
    snakeParts.shift();
  }

  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
};

const changeSnakePosition = () => {
  headX += xVelocity;
  headY += yVelocity;
};

const drawApple = () => {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
};

const checkAppleCollision = () => {
  if (appleX === headX && appleY === headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
    gulpSound.play();
  }
};

document.addEventListener("keydown", (event) => {
  if (event.key === "w" || event.key === "ArrowUp") {
    if (inputsYVelocity === 1) return;
    inputsYVelocity = -1;
    inputsXVelocity = 0;
  }

  if (event.key === "s" || event.key === "ArrowDown") {
    if (inputsYVelocity === -1) return;
    inputsYVelocity = 1;
    inputsXVelocity = 0;
  }

  if (event.key === "a" || event.key === "ArrowLeft") {
    if (inputsXVelocity === 1) return;
    inputsYVelocity = 0;
    inputsXVelocity = -1;
  }

  if (event.key === "d" || event.key === "ArrowRight") {
    if (inputsXVelocity === -1) return;
    inputsYVelocity = 0;
    inputsXVelocity = 1;
  }
});

drawGame();
