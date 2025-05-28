const readline = require('readline');
const esc = require('ansi-escapes');

// initializing the variables
let map, snake, snakeHead, foodPos, score, interval;

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

// handling keypress events
process.stdin.on('keypress', (str, key) => {
    if (key.name == 'z' && key.ctrl) {
        console.log(esc.cursorShow);
        process.exit(0);
    } else if (key.name == "up") {
        if (!snakeHead.movingDown) {
            snakeHead.movingForward = true;
            snakeHead.movingDown = false;
            snakeHead.movingLeft = false;
            snakeHead.movingRight = false;
        }
    } else if (key.name == "down") {
        if (!snakeHead.movingForward) {
            snakeHead.movingForward = false;
            snakeHead.movingDown = true;
            snakeHead.movingLeft = false;
            snakeHead.movingRight = false;
        }
    } else if (key.name == "left") {
        if (!snakeHead.movingRight) {
            snakeHead.movingForward = false;
            snakeHead.movingDown = false;
            snakeHead.movingLeft = true;
            snakeHead.movingRight = false;
        }
    } else if (key.name == "right") {
        if (!snakeHead.movingLeft) {
            snakeHead.movingForward = false;
            snakeHead.movingDown = false;
            snakeHead.movingLeft = false;
            snakeHead.movingRight = true;
        }
    }
});


function newGame() {
    score = 0;
    // creating a 25 x 30 map
    map = Array.from(Array(15), _ => Array(30).fill(0));
    // setting the snake in the middle
    snakeHead = { x: 12, y: 5, movingForward: true, movingDown: false, movingLeft: false, movingRight: false };
    snake = [
        [12, 5],
        [12, 6]
    ];

    map[5][12] = 1; // head
    map[6][12] = 2; // body

    // setting the food
    foodPos = { x: 5, y: 3 };
    map[3][5] = 5;

    drawMap();

}

function drawMap() {
    // top borders
    res = "▉" + ("▉▉▉".repeat(map[0].length)) + "▉\n▉";
    // drawing other parts
    for (let row of map) {
        for (let col of row) {
            if (col == 0) {
                res += "   ";
            } else if (col == 1) {
                res += clr(" ⬤ ", "yellow");
            } else if (col == 2) {
                res += clr(" ⬤ ", "green");
            } else if (col == 5) {
                res += clr(" ❤ ", "red");
            }
        }
        res += "▉\n▉";
    }
    // bottom borders
    print(res + "▉" + ("▉▉▉".repeat(map[0].length)) + "\n");
    print("Score: " + score, true, false);
}

function setFoodPos() {
    // searching for suitable places to set the food
    let suitablePos = [];
    for (let row in map) {
        for (let col in map) {
            if (map[row][col] == " ") suitablePos.push([row, col]);
        }
    }
    //setting the food in one of the suitable places
    let choosen = suitablePos[randInt(0, suitablePos.length)];
    foodPos.x = choosen[1];
    foodPos.y = choosen[0];
}

function isEatingFood() {
    return snakeHead.x == foodPos.x && snakeHead.y == foodPos.y;
}

function isEatingSelf() {
    return snake.find((val, index) => {
        return index != 0 && val[0] == snakeHead.x && val[1] == snakeHead.y;
    });
}

function loop() {
    // clearing all the values in the map (setting them to 0)
    map = Array.from(Array(15), _ => Array(30).fill(0));

    // snake move logic
    if (snakeHead.movingForward) {
        snakeHead.y -= 1;
    } else if (snakeHead.movingDown) {
        snakeHead.y += 1;
    } else if (snakeHead.movingLeft) {
        snakeHead.x -= 1;
    } else if (snakeHead.movingRight) {
        snakeHead.x += 1;
    }

    for (let i = snake.length - 1; i > 0; i--) {
        snake[i] = snake[i - 1];
    }

    snake[0] = [snakeHead.x, snakeHead.y];

    // wall hit detetion
    if (snakeHead.x < 0) {
        gameOver("You hit the wall!");
    } else if (snakeHead.x >= map[0].length) {
        gameOver("You hit the wall!");
    } else if (snakeHead.y < 0) {
        gameOver("You hit the wall!");
    } else if (snakeHead.y >= 15) {
        gameOver("You hit the wall!");
    }

    for (let segments of snake) {
        map[segments[1]][segments[0]] = 1;
    }

    if (isEatingFood()) {
        snake.push([-1, -1]);
        setFoodPos();
        score++;
    }

    map[snakeHead.y][snakeHead.x] = 2;
    map[foodPos.y][foodPos.x] = 5;

    drawMap();

    if (isEatingSelf()) {
        gameOver("You ate yourself");
        process.exit(0);
    }

    // variable for the speed of the game
    let maxSpeed = 500;
    let minSpeed = 80;
    let speedFactor = 10;

    // calculate the new speed based on the score
    let newInterval = maxSpeed - score * speedFactor;

    // ensure the new interval is not less than the minimum speed
    if (newInterval < minSpeed) {
        newInterval = minSpeed;
    }

    // clear the previous interval and set a new one
    clearInterval(interval);
    interval = setInterval(loop, newInterval);

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', function (key) {
    // press 'q' to quit the game
    if (key === 'q' || key === '\u0003') {
        console.log("\nQuitting game.");
        process.exit();
    }
    });
}

function main() {
    newGame();
    drawMap();
    interval = setInterval(loop, 800);
}

function gameOver(msg) {
    print(clr("Game over! " + msg, "red"), false, false);
    process.exit(0);
}

function print(str, hide = true, clear = true) {
    if (clear) {
        console.log(esc.clearTerminal);
    }
    console.log(str);
    console.log(hide ? esc.cursorHide : esc.cursorShow);
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clr(text, color) {
    const code = { red: 91, green: 92, blue: 34, cian: 96, yellow: 93 }[color];
    if (code) return "\x1b[" + code + "m" + text + "\x1b[0m";
}

main();
