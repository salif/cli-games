const readline = require('readline');
const esc = require('ansi-escapes');
const { maps, symbols } = require('./maps.json');
const Hero = require('./Hero');

let round = 0;
let map = maps[round];
let hero = new Hero(map);
let gameStart = false;
let moveCount = 0;
let totalMoves = 0;

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
    if (key.name == 'z' && key.ctrl) {
        console.log(esc.cursorShow);
        process.exit(0);
    } else if (!gameStart) {
        gameStart = true;
        welcome();
    } else if (hero.hasWon()) {
        if (round + 1 < maps.length) {
            round++;
            map = maps[round];
            hero.nextMap(map);
            moveCount = 0;
        } else {
            console.log(clr("Congratulations! You've completed all the maps", "green"));
            console.log(clr("Your number of moves is " + totalMoves,"blue"));
            process.exit(0);
        }
    } else if (key.name === 'q') {
        console.log("Thank you for playing!");
        process.exit(0);
    }  else {
        if (gameStart) {
            switch (key.name) {
                case "up":
                    hero.moveUp();
                    moveCount++;
                    totalMoves++;
                    break;
                case "down":
                    hero.moveDown();
                    moveCount++;
                    totalMoves++;
                    break;
                case "left":
                    hero.moveLeft();
                    moveCount++;
                    totalMoves++;
                    break;
                case "right":
                    hero.moveRight();
                    moveCount++;
                    totalMoves++;
                    break;
            }
        }
    } 
    draw();
});

function draw() {
    let res = "    " + (symbols.wall + " ").repeat(map[0].length) + "\n";
    for (let row of map) {
        res += "  " + symbols.wall + " ";
        for (let col of row) {
            res += col + " ";
        }
        res += symbols.wall + '\n';
    }
    res += "    " + (symbols.wall + " ").repeat(map[0].length) + "\n";
    res = res.replace("♟", clr("♟", "yellow")).replace(/▣/g, clr("▣", "green"));
    
    res += `\n${clr("Moves:", "blue")} ${moveCount}\n`;
    res += `${clr("Total Moves:", "blue")} ${totalMoves}\n`;

    print(res);

    if (hero.hasWon()) {
        console.log(clr("Press any key to continue", "cian"));
    }
}

function welcome() {

    const logo = `
         __  __    __    ____  ____    ____  ___   ___    __    ____  ____
        (  \\/  )  /__\\  (_   )( ___)  ( ___)/ __) / __)  /__\\  (  _ \\( ___)
         )    (  /(__)\\  / /_  )__)    )__) \\__ \\( (__  /(__)\\  )___/ )__)
        (_/\\/\\_)(__)(__)(____)(____)  (____)(___/ \\___)(__)(__)(__)  (____) !!!

    `;
    print(`

    Welcome to
    ${clr(logo, 'yellow')}

    Maze escape game for Salif's CLI game collection.

    ${clr('Help', 'green')}
     - This is you: ♟
     - This is your goal: ▣

       Move your character using arrow keys and reach your goal while avoiding walls.

    ${clr('Press any key to continue...', 'cian')}

    `);
}

/*Salif's coloring function*/
function clr(text, color) {
    const code = { red: 91, green: 92, blue: 34, cian: 96, yellow: 93 }[color];
    if (code) return "\x1b[" + code + "m" + text + "\x1b[0m";
}

function print(str, hide = true) {
    console.log(esc.clearTerminal);
    console.log(str);
    console.log(hide ? esc.cursorHide : esc.cursorShow);
}

function main() {
    welcome();
}

main();
