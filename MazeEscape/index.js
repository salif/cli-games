const readline = require('readline');
const esc = require('ansi-escapes');

class Hero {

    constructor() {
        this.x = 0;
        this.y = 0;
    }

    moveUp() {
        if (this.canGo(this.x, this.y - 1)) {
            this.leave();
            this.goto(this.x, this.y - 1);
        }
    }

    moveDown()  {
        if (this.canGo(this.x, this.y + 1)) {
            this.leave();
            this.goto(this.x, this.y + 1);
        }
    }

    moveLeft() {
        if (this.canGo(this.x - 1, this.y)) {
            this.leave();
            this.goto(this.x - 1, this.y);
        }
    }

    moveRight() {
        if (this.canGo(this.x + 1, this.y)) {
            this.leave();
            this.goto(this.x + 1, this.y);
        }
    }

    goto(x, y) {
        if (this.canGo(x, y)) {
            this.x = x;
            this.y = y;
            map[y][x] = 'X';
        }
    }

    leave()  {
        map[this.y][this.x] = " ";
    }

    canGo(x, y) {
        return map[y] && map[y][x] == " ";
    }

}

let map = [
    ["X", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
]


let hero = new Hero();

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
            res += col;
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