const blessed = require('blessed');

const screen = blessed.screen({
  smartCSR: true,
  title: 'Tetris Terminal',
});

const box = blessed.box({
  top: 1,
  left: 'center',
  width: 22,
  height: 22, // suffisamment grand pour le plateau
  border: {
    type: 'line',
  },
  style: {
    fg: 'white',
    border: { fg: '#00ff00' },
  },
});

const scoreBox = blessed.box({
  top: 23, // juste en dessous du cadre
  left: 'center',
  width: 24,
  height: 1,
  align: 'center',
  style: {
    fg: 'yellow',
  },
});

const controlsBox = blessed.box({
  top: 24, // juste en dessous du score
  left: 'center',
  width: 24,
  height: 1,
  align: 'center',
  style: {
    fg: 'cyan',
  },
});

screen.append(box);
screen.append(scoreBox);
screen.append(controlsBox);
screen.render();

screen.key(['q', 'C-c'], () => process.exit(0));

const shapes = [
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[0, 1, 0], [1, 1, 1]], // T
  [[0, 1, 1], [1, 1, 0]], // S
  [[1, 1, 0], [0, 1, 1]], // Z
];

let board = Array.from({ length: 20 }, () => Array(10).fill(0));
let score = 0;
let isPaused = false;

let current = {
  shape: shapes[Math.floor(Math.random() * shapes.length)],
  x: 3,
  y: 0,
};

function clearLines() {
  let newBoard = board.filter(row => row.some(cell => cell === 0));
  const cleared = 20 - newBoard.length;
  if (cleared > 0) {
    score += cleared * 100;
  }
  while (newBoard.length < 20) {
    newBoard.unshift(Array(10).fill(0));
  }
  board = newBoard;
}

function mergePiece() {
  const { shape, x, y } = current;
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (shape[i][j]) {
        board[y + i][x + j] = 1;
      }
    }
  }
}

function collides() {
  const { shape, x, y } = current;
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (
        shape[i][j] &&
        (board[y + i] === undefined ||
          board[y + i][x + j] === undefined ||
          board[y + i][x + j])
      ) {
        return true;
      }
    }
  }
  return false;
}

function rotate(matrix) {
  return matrix[0].map((_, i) => matrix.map(row => row[i]).reverse());
}

function draw() {
  let tempBoard = board.map(row => [...row]);
  const { shape, x, y } = current;
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (shape[i][j]) {
        if (tempBoard[y + i]) {
          tempBoard[y + i][x + j] = 1;
        }
      }
    }
  }

  let output = '';
  for (let row of tempBoard) {
    output += row.map(cell => (cell ? '██' : '  ')).join('') + '\n';
  }

  box.setContent(output);
  scoreBox.setContent(`Score: ${score}${isPaused ? ' (PAUSED)' : ''}`);
  controlsBox.setContent('P = Pause | Q = Quit');
  screen.render();
}

function moveDown() {
  if (isPaused) return;

  current.y++;
  if (collides()) {
    current.y--;
    mergePiece();
    clearLines();
    current.shape = shapes[Math.floor(Math.random() * shapes.length)];
    current.x = 3;
    current.y = 0;
    if (collides()) {
      box.setContent('Game Over!\nScore: ' + score);
      screen.render();
      clearInterval(game);
      return;
    }
  }
  draw();
}

screen.key(['up'], () => {
  if (isPaused) return;
  const original = current.shape;
  const rotated = rotate(current.shape);
  current.shape = rotated;
  if (collides()) {
    current.shape = original;
  }
  draw();
});

screen.key(['left'], () => {
  if (isPaused) return;
  current.x--;
  if (collides()) current.x++;
  draw();
});

screen.key(['right'], () => {
  if (isPaused) return;
  current.x++;
  if (collides()) current.x--;
  draw();
});

screen.key(['down'], () => {
  if (isPaused) return;
  moveDown();
});

screen.key(['p'], () => {
  isPaused = !isPaused;
  draw();
});

let game = setInterval(moveDown, 500);
draw();
