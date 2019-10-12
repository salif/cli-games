const readline = require('readline');
const esc = require('ansi-escapes');
const {maps, symbols} = require('./maps.json');
const Hero = require('./Hero');

let round = 0;
let map = maps[round];
let hero = new Hero(map);


readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
  if (key.name == 'z' && key.ctrl) {
      console.log(esc.cursorShow);
      process.exit(0);
  } else if (hero.hasWon()) {
      if (round + 1 < maps.length) {
          round++
          map = maps[round];
          hero.nextMap(map);
      } else {
          console.log("Congratulations! You've completed all the maps");
          process.exit(0);
      }
  } else {
      switch (key.name) {
          case "up":
            hero.moveUp();
            break;
          case "down":
            hero.moveDown();
            break;
          case "left":
            hero.moveLeft();
            break;
          case "right":
            hero.moveRight();
            break;
      }
  }
  draw();
})

function draw() {
    let res = '';
    for (let row of map) {
        for (let col of row) {
            res += col + " ";
        }
        res += '\n';
    }
    console.log(esc.clearTerminal)
    console.log(res);
    console.log(esc.cursorHide);

    if (hero.hasWon()) {
        console.log("Press any key to continue");
    }
}

function main() {
    draw();
}

main();
