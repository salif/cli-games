const readline = require('readline');
const esc = require('ansi-escapes');
const maps = require('./maps.json').maps;
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
  //console.log(hero);
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
}

function main() {
    draw();
}

main();