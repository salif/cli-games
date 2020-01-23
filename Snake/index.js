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

function isEatingFood() {
    return snakeHead.x == foodPos.x && snakeHead.y == foodPos.y
}

function isEatingSelf() {
    return snake.find((val, index) => {
        return index != 0 && val[0] == snakeHead.x && val[1] == snakeHead.y
    })
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
        print('game over')
        process.exit(0)
    } else if (snakeHead.x >= map[0].length) {
        print('game over')
        process.exit(0)
    } else if (snakeHead.y < 0) {
        process.exit(0)
        snakeHead.x = 29
    } else if (snakeHead.y >= 29) {
        process.exit(0)
        snakeHead.x = 0
    }
    
    
    for (let segments of snake) {
        map[segments[1]][segments[0]] = 1
    }
    
    if (isEatingFood()) {
        snake.push([-1, -1])
        foodPos.x = randInt(0, 29)
        foodPos.y = randInt(0, map.length - 1)
    }
    
    map[snakeHead.y][snakeHead.x] = 2
    map[foodPos.y][foodPos.x] = 5
        
    drawMap()

    if (isEatingSelf()) {
        print('eating urself')
        process.exit(0)
    }
    
}

function main() {
    newGame()
    drawMap()
    setInterval(loop, 400)
}
        
function print(str, hide=true, clear=true) {
    if (clear) {
        console.log(esc.clearTerminal)
    }
    console.log(str);
    console.log(hide ? esc.cursorHide : esc.cursorShow);
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

main()