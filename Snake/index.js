const readline = require('readline');
const esc = require('ansi-escapes');

// initializing the variables
let map, snake, snakeHead, foodPos

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
    if (key.name == 'z' && key.ctrl) {
      console.log(esc.cursorShow);
      process.exit(0);
    } else if (key.name == "up") {
        if (!snakeHead.movingDown) {
            snakeHead.movingForward = true
            snakeHead.movingDown = false
            snakeHead.movingLeft = false
            snakeHead.movingRight = false
        }
    } else if (key.name == "down") {
        if (!snakeHead.movingForward) {
            snakeHead.movingForward = false
            snakeHead.movingDown = true
            snakeHead.movingLeft = false
            snakeHead.movingRight = false
        }
    } else if (key.name == "left") {
        if (!snakeHead.movingRight) {
            snakeHead.movingForward = false
            snakeHead.movingDown = false
            snakeHead.movingLeft = true
            snakeHead.movingRight = false
        }
    } else if (key.name == "right") {
        if (!snakeHead.movingLeft) {
            snakeHead.movingForward = false
            snakeHead.movingDown = false
            snakeHead.movingLeft = false
            snakeHead.movingRight = true
        }
    }
})


function newGame() {
    // creating a 25 x 30 map
    map = Array.from(Array(15), _ => Array(30).fill(0));
    // setting the snake in the middle
    snakeHead = {x: 12, y: 5, movingForward: true, movingDown: false, movingLeft: false, movingRight: false}
    snake = [
        [12, 5],
        [12, 6]
    ]

    map[5][12] = 1 // head
    map[6][12] = 2 // body

    // setting the food
    foodPos = {x:5, y:3}
    map[3][5] = 5

    drawMap()

}

function drawMap() {
    res = ""

    for (let row of map) {
        for (let col of row) {
            if (col == 0) {
                res += "   "
            } else if (col == 1) {
                res += " 8 "
            } else if (col == 2) {
                res += " O "
            } else if (col == 5) {
                res += " A "
            }
        }
        res += "\n"
    }

    print(res)
}

function loop() {
    map = Array.from(Array(15), _ => Array(30).fill(0));

    if (snakeHead.movingForward) {
        snakeHead.y -= 1
    } else if (snakeHead.movingDown) {
        snakeHead.y += 1
    } else if (snakeHead.movingLeft) {
        snakeHead.x -= 1
    } else if (snakeHead.movingRight) {
        snakeHead.x += 1
    }
    
    for (let i=snake.length - 1; i > 0; i--) {
        snake[i] = snake[i-1]
    }
    
    snake[0] = [snakeHead.x, snakeHead.y]

    if (snakeHead.x < 0) {
        snakeHead.x = map[0].length - 1
    } else if (snakeHead.x >= map[0].length) {
        snakeHead.x = 0
    // FIXME: Snake should appear on the other side when it exceeds the space
    } else if (snakeHead.y < 0) {
        snakeHead.x = 29
    } else if (snakeHead.y >= 29) {
        snakeHead.x = 0
    }

    for (let segments of snake) {
        map[segments[1]][segments[0]] = 1
    }
    
    map[snakeHead.y][snakeHead.x] = 2
    map[foodPos.y][foodPos.x] = 5

    drawMap()
}

function main() {
    newGame()
    drawMap()
    setInterval(loop, 1000)
}
        
function print(str, hide=true, clear=true) {
    if (clear) {
        console.log(esc.clearTerminal)
    }
    console.log(str);
    console.log(hide ? esc.cursorHide : esc.cursorShow);
}

main()